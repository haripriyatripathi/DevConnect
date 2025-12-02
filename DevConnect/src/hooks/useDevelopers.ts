import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Developer, DeveloperFormData } from '@/types/developer';
import { toast } from '@/hooks/use-toast';

export function useDevelopers() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [techFilter, setTechFilter] = useState('all');

  // Fetch all developers on mount
  useEffect(() => {
    fetchDevelopers();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('developers-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'developers',
        },
        () => {
          fetchDevelopers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Fetch developers from database
  async function fetchDevelopers() {
    try {
      const { data, error } = await supabase
        .from('developers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDevelopers((data as Developer[]) || []);
    } catch (error) {
      console.error('Error fetching developers:', error);
      toast({
        title: 'Error',
        description: 'Failed to load developers. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Add a new developer
  async function addDeveloper(formData: DeveloperFormData) {
    setIsSubmitting(true);
    try {
      const techStackArray = formData.techStack
        .split(',')
        .map((tech) => tech.trim())
        .filter((tech) => tech.length > 0);

      const { error } = await supabase.from('developers').insert({
        name: formData.name.trim(),
        role: formData.role,
        tech_stack: techStackArray,
        experience: formData.experience,
      });

      if (error) throw error;

      toast({
        title: 'Success!',
        description: `${formData.name} has been added to the directory.`,
      });
    } catch (error) {
      console.error('Error adding developer:', error);
      toast({
        title: 'Error',
        description: 'Failed to add developer. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Get all unique technologies from developers
  const availableTechs = useMemo(() => {
    const techSet = new Set<string>();
    developers.forEach((dev) => {
      dev.tech_stack.forEach((tech) => techSet.add(tech.trim()));
    });
    return Array.from(techSet).sort();
  }, [developers]);

  // Filter developers based on search and filters
  const filteredDevelopers = useMemo(() => {
    return developers.filter((dev) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dev.tech_stack.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Role filter
      const matchesRole = roleFilter === 'all' || dev.role === roleFilter;

      // Tech filter
      const matchesTech =
        techFilter === 'all' ||
        dev.tech_stack.some(
          (tech) => tech.toLowerCase() === techFilter.toLowerCase()
        );

      return matchesSearch && matchesRole && matchesTech;
    });
  }, [developers, searchQuery, roleFilter, techFilter]);

  return {
    developers: filteredDevelopers,
    allDevelopers: developers,
    isLoading,
    isSubmitting,
    addDeveloper,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    techFilter,
    setTechFilter,
    availableTechs,
  };
}
