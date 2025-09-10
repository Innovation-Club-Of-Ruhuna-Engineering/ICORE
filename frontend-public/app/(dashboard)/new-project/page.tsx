"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { projectApi, CreateProjectData } from '@/lib/projects/projectMethods';
import { toast } from 'react-hot-toast';

const NewProjectPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateProjectData>({
    name: '',
    about: '',
    description: '',
    type: 'RESEARCH',
    startDate: '',
    tags: [],
    technologies: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'tags' | 'technologies' | 'references' | 'papers') => {
    const values = e.target.value.split(',').map(item => item.trim());
    setFormData(prev => ({
      ...prev,
      [field]: values
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.startDate) {
        toast.error('Start date is required');
        return;
      }

      // Format dates to ISO string
      const formattedData: CreateProjectData = {
        ...formData,
        startDate: new Date(formData.startDate + 'T00:00:00.000Z').toISOString(),
        endDate: formData.endDate ? new Date(formData.endDate + 'T00:00:00.000Z').toISOString() : undefined
      };

      await projectApi.createProject(formattedData);
      toast.success('Project created successfully!');
      router.push('/me'); // Redirect to profile page
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Create New Project</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Project Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Project Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                >
                  <option value="RESEARCH">Research</option>
                  <option value="DEVELOPMENT">Development</option>
                  <option value="DESIGN">Design</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">End Date (Optional)</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 mb-2">About</label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                />
              </div>
            </div>

            {/* Tags and Technologies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags.join(', ')}
                  onChange={(e) => handleArrayChange(e, 'tags')}
                  placeholder="AI, Web Development, Research"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Technologies (comma-separated)</label>
                <input
                  type="text"
                  value={formData.technologies.join(', ')}
                  onChange={(e) => handleArrayChange(e, 'technologies')}
                  placeholder="React, Node.js, PostgreSQL"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                />
              </div>
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">GitHub URL</label>
                <input
                  type="url"
                  name="githubURL"
                  value={formData.githubURL || ''}
                  onChange={handleChange}
                  placeholder="https://github.com/username/repo"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Website URL</label>
                <input
                  type="url"
                  name="websiteURL"
                  value={formData.websiteURL || ''}
                  onChange={handleChange}
                  placeholder="https://yourproject.com"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 mb-2">YouTube URL</label>
                <input
                  type="url"
                  name="youtubeURL"
                  value={formData.youtubeURL || ''}
                  onChange={handleChange}
                  placeholder="https://youtube.com/watch?v=..."
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 text-base font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Creating...' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProjectPage;