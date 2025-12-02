import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { DeveloperRole } from '@/types/developer';

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  roleFilter: string;
  onRoleFilterChange: (role: string) => void;
  techFilter: string;
  onTechFilterChange: (tech: string) => void;
  availableTechs: string[];
}

export function SearchFilters({
  searchQuery,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  techFilter,
  onTechFilterChange,
  availableTechs,
}: SearchFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
      
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search developers..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-white border border-gray-300"
        />
      </div>

      {/* Role Filter */}
      <Select value={roleFilter} onValueChange={onRoleFilterChange}>
        <SelectTrigger className="w-full sm:w-[160px] bg-white border border-gray-300">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="All Roles" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200">
          <SelectItem value="all">All Roles</SelectItem>
          <SelectItem value="Frontend">Frontend</SelectItem>
          <SelectItem value="Backend">Backend</SelectItem>
          <SelectItem value="Full-Stack">Full-Stack</SelectItem>
        </SelectContent>
      </Select>

      {/* Tech Filter */}
      <Select value={techFilter} onValueChange={onTechFilterChange}>
        <SelectTrigger className="w-full sm:w-[180px] bg-white border border-gray-300">
          <SelectValue placeholder="All Technologies" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200 max-h-[300px]">
          <SelectItem value="all">All Technologies</SelectItem>
          {availableTechs.map((tech) => (
            <SelectItem key={tech} value={tech}>
              {tech}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
