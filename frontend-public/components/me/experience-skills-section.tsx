"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Plus, X, Save, Loader2, Briefcase, Award, Code } from "lucide-react";
import { profileApi } from "@/lib/profile/profileMethods";
import Card from "@/components/me/card";
import { User } from "@/types/auth/userAuthTypes";

interface ExperienceSkillsSectionProps {
    user: User;
    onUpdate: () => void;
}

interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
}

interface Skill {
    id: string;
    name: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export function ExperienceSkillsSection({ user, onUpdate }: ExperienceSkillsSectionProps) {
    const [loading, setLoading] = useState(false);
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [skillInput, setSkillInput] = useState("");

    // Load existing experiences and skills from user data
    useEffect(() => {
        if (user.experiences && Array.isArray(user.experiences)) {
            setExperiences(user.experiences as Experience[]);
        }
        if (user.skills && Array.isArray(user.skills)) {
            setSkills(user.skills as Skill[]);
        }
    }, [user]);

    const handleSave = async () => {
        try {
            setLoading(true);
            // Save experiences and skills as JSON to the backend
            await profileApi.updateProfile({
                experiences: experiences,
                skills: skills.map(skill => skill.name),
            });
            toast.success("Experience & Skills updated successfully!");
            onUpdate();
        } catch (error) {
            console.error("Error updating experience & skills:", error);
            toast.error("Failed to update experience & skills. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const addExperience = () => {
        const newExperience: Experience = {
            id: Date.now().toString(),
            title: "",
            company: "",
            location: "",
            startDate: "",
            endDate: "",
            current: false,
            description: "",
        };
        setExperiences(prev => [...prev, newExperience]);
    };

    const updateExperience = (id: string, field: keyof Experience, value: Experience[keyof Experience]) => {
        setExperiences(prev =>
            prev.map(exp =>
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        );
    };

    const removeExperience = (id: string) => {
        setExperiences(prev => prev.filter(exp => exp.id !== id));
    };

    const addSkill = () => {
        if (skillInput.trim() && !skills.find(s => s.name.toLowerCase() === skillInput.toLowerCase())) {
            const newSkill: Skill = {
                id: Date.now().toString(),
                name: skillInput.trim(),
                level: 'Intermediate',
            };
            setSkills(prev => [...prev, newSkill]);
            setSkillInput("");
        }
    };

    const updateSkillLevel = (id: string, level: Skill['level']) => {
        setSkills(prev =>
            prev.map(skill =>
                skill.id === id ? { ...skill, level } : skill
            )
        );
    };

    const removeSkill = (id: string) => {
        setSkills(prev => prev.filter(skill => skill.id !== id));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    };

    return (
        <Card className="flex flex-1">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <Card.Header>Experience & Skills</Card.Header>
                    <p className="text-gray-600 text-sm mt-1">
                        Showcase your professional background and technical expertise
                    </p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="h-4 w-4" />
                    )}
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </div>

            <div className="space-y-8">
                {/* Experience Section */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-gray-600" />
                            <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
                        </div>
                        <button
                            onClick={addExperience}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                            Add Experience
                        </button>
                    </div>

                    <div className="space-y-4">
                        {experiences.map((experience) => (
                            <div key={experience.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                                            <input
                                                type="text"
                                                value={experience.title}
                                                onChange={(e) => updateExperience(experience.id, 'title', e.target.value)}
                                                placeholder="Software Engineer"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                            <input
                                                type="text"
                                                value={experience.company}
                                                onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                                                placeholder="Tech Company Inc."
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeExperience(experience.id)}
                                        className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                        <input
                                            type="text"
                                            value={experience.location}
                                            onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                                            placeholder="San Francisco, CA"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                        <input
                                            type="month"
                                            value={experience.startDate}
                                            onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                        <input
                                            type="month"
                                            value={experience.endDate}
                                            onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                                            disabled={experience.current}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={experience.current}
                                            onChange={(e) => updateExperience(experience.id, 'current', e.target.checked)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">I currently work here</span>
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        value={experience.description}
                                        onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                                        placeholder="Describe your responsibilities and achievements..."
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    />
                                </div>
                            </div>
                        ))}

                        {experiences.length === 0 && (
                            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500 mb-4">No work experience added yet</p>
                                <button
                                    onClick={addExperience}
                                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Your First Experience
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Skills Section */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Code className="h-5 w-5 text-gray-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
                    </div>

                    <div className="mb-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Add a skill (e.g., JavaScript, Python, Design)"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={addSkill}
                                disabled={!skillInput.trim()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {skills.map((skill) => (
                            <div key={skill.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900">{skill.name}</div>
                                    <select
                                        value={skill.level}
                                        onChange={(e) => updateSkillLevel(skill.id, e.target.value as Skill['level'])}
                                        className="mt-1 text-sm border-none bg-transparent focus:outline-none text-gray-600"
                                    >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                        <option value="Expert">Expert</option>
                                    </select>
                                </div>
                                <button
                                    onClick={() => removeSkill(skill.id)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {skills.length === 0 && (
                        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                            <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500 mb-4">No skills added yet</p>
                            <p className="text-sm text-gray-400">Add skills to showcase your expertise</p>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
}
