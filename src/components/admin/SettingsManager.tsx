
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const SettingsManager = () => {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-medium mb-4">Admin Access Configuration</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="admin-setup">
            <AccordionTrigger className="text-left">How to set up admin access</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-sm">
                <p>To grant admin access to a user:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Go to the Supabase Dashboard</li>
                  <li>Navigate to Authentication → Users</li>
                  <li>Find the user and click on the three dots (...)</li>
                  <li>Select "Edit user"</li>
                  <li>In the "User Metadata" field, add the following JSON:</li>
                </ol>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  {`{\n  "role": "admin"\n}`}
                </pre>
                <p>This will give the user admin privileges on their next sign-in.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-medium mb-4">Supabase Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Project URL</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded" 
              value={`${window.location.origin}`} 
              readOnly 
            />
            <p className="text-sm text-gray-500 mt-1">Set this as your Site URL in Supabase Authentication settings</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Redirect URLs</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded" 
              value={`${window.location.origin}/*`} 
              readOnly 
            />
            <p className="text-sm text-gray-500 mt-1">Add this to your Redirect URLs in Supabase Authentication settings</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-medium mb-4">Storage Settings</h3>
        <div className="space-y-4">
          <p>Current storage buckets:</p>
          <ul className="list-disc list-inside">
            <li>images (Public)</li>
            <li>site-images (Public)</li>
          </ul>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-medium mb-4">Quick Links</h3>
        <div className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={() => window.open('https://supabase.com/dashboard/project/vbkgqcdvbijtlcooiuga/auth/providers', '_blank')}
          >
            Authentication Settings
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={() => window.open('https://supabase.com/dashboard/project/vbkgqcdvbijtlcooiuga/storage/buckets', '_blank')}
          >
            Storage Settings
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={() => window.open('https://supabase.com/dashboard/project/vbkgqcdvbijtlcooiuga/auth/users', '_blank')}
          >
            User Management
          </Button>
        </div>
      </Card>
    </div>
  );
};
