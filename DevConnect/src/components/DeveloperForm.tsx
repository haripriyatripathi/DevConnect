import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';
import { DeveloperFormData, DeveloperRole } from '@/types/developer';

interface DeveloperFormProps {
  onSubmit: (data: DeveloperFormData) => Promise<void>;
  isLoading: boolean;
}

export function DeveloperForm({ onSubmit, isLoading }: DeveloperFormProps) {
  const [formData, setFormData] = useState<DeveloperFormData>({
    name: '',
    role: 'Frontend',
    techStack: '',
    experience: 0,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof DeveloperFormData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof DeveloperFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    if (!formData.techStack.trim()) {
      newErrors.techStack = 'Tech stack is required';
    }

    if (formData.experience < 0) {
      newErrors.experience = 'Experience cannot be negative';
    } else if (formData.experience > 50) {
      newErrors.experience = 'Experience seems unrealistic';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    await onSubmit(formData);
    setFormData({ name: '', role: 'Frontend', techStack: '', experience: 0 });
    setErrors({});
  };

  return (
    <Card className="shadow-card border-border/50 bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <div className="p-2 rounded-lg bg-primary/10">
            <UserPlus className="h-5 w-5 text-primary" />
          </div>
          Add Developer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Role Field */}
          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium">
              Role
            </Label>
            <Select
              value={formData.role}
              onValueChange={(value: DeveloperRole) =>
                setFormData({ ...formData, role: value })
              }
            >
              <SelectTrigger className={errors.role ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="Frontend">Frontend</SelectItem>
                <SelectItem value="Backend">Backend</SelectItem>
                <SelectItem value="Full-Stack">Full-Stack</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-xs text-destructive">{errors.role}</p>
            )}
          </div>

          {/* Tech Stack Field */}
          <div className="space-y-2">
            <Label htmlFor="techStack" className="text-sm font-medium">
              Tech Stack
            </Label>
            <Input
              id="techStack"
              placeholder="React, TypeScript, Node.js"
              value={formData.techStack}
              onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
              className={errors.techStack ? 'border-destructive' : ''}
            />
            <p className="text-xs text-muted-foreground">
              Separate technologies with commas
            </p>
            {errors.techStack && (
              <p className="text-xs text-destructive">{errors.techStack}</p>
            )}
          </div>

          {/* Experience Field */}
          <div className="space-y-2">
            <Label htmlFor="experience" className="text-sm font-medium">
              Experience (years)
            </Label>
            <Input
              id="experience"
              type="number"
              min="0"
              max="50"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })
              }
              className={errors.experience ? 'border-destructive' : ''}
            />
            {errors.experience && (
              <p className="text-xs text-destructive">{errors.experience}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full font-medium"
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Developer'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
