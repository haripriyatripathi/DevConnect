import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Developer } from '@/types/developer';
import { Code2, Briefcase, Calendar } from 'lucide-react';

interface DeveloperCardProps {
  developer: Developer;
  index: number;
}

// Get role badge styles based on role type
function getRoleBadgeClass(role: string): string {
  switch (role) {
    case 'Frontend':
      return 'badge-frontend';
    case 'Backend':
      return 'badge-backend';
    case 'Full-Stack':
      return 'badge-fullstack';
    default:
      return '';
  }
}

export function DeveloperCard({ developer, index }: DeveloperCardProps) {
  const formattedDate = new Date(developer.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Card
      className="
        bg-white 
        border border-gray-200 
        rounded-xl 
        shadow-sm 
        hover:shadow-md 
        hover:-translate-y-1 
        transition-all 
        duration-300 
        overflow-hidden 
        group 
        animate-fade-up
      "
      style={{
        animationDelay: `${index * 80}ms`,
      }}
    >
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Avatar placeholder with initials */}
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-lg">
              {developer.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)}
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {developer.name}
              </h3>
              <Badge
                variant="outline"
                className={`mt-1 text-xs font-medium ${getRoleBadgeClass(developer.role)}`}
              >
                {developer.role}
              </Badge>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Code2 className="h-4 w-4" />
            <span>Tech Stack</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {developer.tech_stack.map((tech, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="text-xs font-normal bg-secondary/80 hover:bg-secondary"
              >
                {tech.trim()}
              </Badge>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4" />
            <span>
              {developer.experience} {developer.experience === 1 ? 'year' : 'years'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
