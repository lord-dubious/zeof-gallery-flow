import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSessionContext } from "@supabase/auth-helpers-react";

const AdminPage = () => {
  const navigate = useNavigate();
  const { session, isLoading } = useSessionContext();

  useEffect(() => {
    if (!isLoading && (!session || session.user.role !== 'admin')) {
      navigate('/');
    }
  }, [session, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-serif mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="navigation" className="w-full">
        <TabsList>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
        </TabsList>

        <TabsContent value="navigation" className="mt-6">
          <h2 className="text-2xl font-serif mb-4">Navigation Management</h2>
          {/* Navigation management will be implemented here */}
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <h2 className="text-2xl font-serif mb-4">Categories Management</h2>
          {/* Categories management will be implemented here */}
        </TabsContent>

        <TabsContent value="images" className="mt-6">
          <h2 className="text-2xl font-serif mb-4">Images Management</h2>
          {/* Images management will be implemented here */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;