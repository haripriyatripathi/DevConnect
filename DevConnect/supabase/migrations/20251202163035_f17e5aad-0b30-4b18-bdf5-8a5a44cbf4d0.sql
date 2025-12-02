-- Create developers table
CREATE TABLE public.developers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Frontend', 'Backend', 'Full-Stack')),
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  experience INTEGER NOT NULL CHECK (experience >= 0),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.developers ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can view developers)
CREATE POLICY "Anyone can view developers" 
ON public.developers 
FOR SELECT 
USING (true);

-- Create policy for public insert access (anyone can add developers)
CREATE POLICY "Anyone can add developers" 
ON public.developers 
FOR INSERT 
WITH CHECK (true);

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.developers;