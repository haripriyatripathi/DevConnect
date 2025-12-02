import { DeveloperCard } from './DeveloperCard';
import { Developer } from '@/types/developer';
import { Users } from 'lucide-react';

interface DeveloperListProps {
  developers: Developer[];
  isLoading: boolean;
}

export function DeveloperList({ developers, isLoading }: DeveloperListProps) {

  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-border/30">

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-48 bg-white rounded-xl shadow-md animate-pulse border border-border"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && developers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-1">
            No developers found
          </h3>
          <p className="text-sm text-muted-foreground text-center max-w-sm">
            Add your first developer or adjust your search filters to find results.
          </p>
        </div>
      )}

      {/* Developer Cards */}
      {!isLoading && developers.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {developers.map((developer, index) => (
            <DeveloperCard key={developer.id} developer={developer} index={index} />
          ))}
        </div>
      )}
      
    </div>
  );
}
