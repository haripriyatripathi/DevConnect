import { DeveloperForm } from '@/components/DeveloperForm';
import { DeveloperList } from '@/components/DeveloperList';
import { SearchFilters } from '@/components/SearchFilters';
import { useDevelopers } from '@/hooks/useDevelopers';
import { Code2, Users } from 'lucide-react';

const Index = () => {
  const {
    developers,
    allDevelopers,
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
  } = useDevelopers();

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <header className="border-b border-border/40 bg-card/80 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-primary shadow-lg shadow-primary/20">
              <Code2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">DevConnect</h1>
              <p className="text-sm text-muted-foreground">
                Discover talented developers
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Left Sidebar */}
          <aside className="w-full lg:w-[350px] xl:w-[380px] shrink-0">
            <div className="sticky top-28">
              <DeveloperForm onSubmit={addDeveloper} isLoading={isSubmitting} />
            </div>
          </aside>

          {/* Right Content */}
          <section className="flex-1 space-y-8">

            {/* Stats */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>
                <strong className="text-foreground">{allDevelopers.length}</strong> developers in directory
                {developers.length !== allDevelopers.length && (
                  <span className="ml-1">
                    ({developers.length} matching filters)
                  </span>
                )}
              </span>
            </div>

            {/* Filters */}
            <SearchFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              roleFilter={roleFilter}
              onRoleFilterChange={setRoleFilter}
              techFilter={techFilter}
              onTechFilterChange={setTechFilter}
              availableTechs={availableTechs}
            />

            {/* Developer Cards */}
           <div className="rounded-xl p-6 border border-border bg-muted/30">
  <DeveloperList developers={developers} isLoading={isLoading} />
</div>


          </section>
        </div>
      </main>

    </div>
  );
};

export default Index;
