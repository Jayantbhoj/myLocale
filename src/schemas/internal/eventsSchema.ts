export interface Event {
  id: string;                
  creator_id: string;        
  name: string; 
  location : string;             
  city: string;              
  locality: string | null;   
  state: string;   
  date: string;          
  start_time: string;        
  end_time: string;          
  capacity: number;          
  cover_image_url: string;   
  created_at: string;        
  description: string | null;
}
