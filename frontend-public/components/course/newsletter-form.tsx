"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNewsletterSubscription } from '@/hooks/useNewsletterSubscription';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader2, Mail, Phone, User, Calendar, School } from 'lucide-react';

interface FormErrors {
    name?: string;
    email?: string;
    contactNumber?: string;
    age?: string;
    school?: string;
}

export const NewsletterForm = () => {
    const { subscribe, loading } = useNewsletterSubscription();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactNumber: '',
        age: '',
        school: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [success, setSuccess] = useState(false);

    const validateForm = () => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.contactNumber.trim()) {
            newErrors.contactNumber = 'Contact number is required';
        } else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.contactNumber.replace(/\s/g, ''))) {
            newErrors.contactNumber = 'Please enter a valid phone number';
        }

        if (formData.age && (isNaN(parseInt(formData.age)) || parseInt(formData.age) < 5 || parseInt(formData.age) > 120)) {
            newErrors.age = 'Please enter a valid age (5-120)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        if (touched[name]) {
            validateField(name, value);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        validateField(name, value);
    };

    const validateField = (name: string, value: string) => {
        const newErrors = { ...errors };

        switch (name) {
            case 'name':
                if (!value.trim()) {
                    newErrors.name = 'Name is required';
                } else {
                    delete newErrors.name;
                }
                break;
            case 'email':
                if (!value.trim()) {
                    newErrors.email = 'Email is required';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    newErrors.email = 'Please enter a valid email';
                } else {
                    delete newErrors.email;
                }
                break;
            case 'contactNumber':
                if (!value.trim()) {
                    newErrors.contactNumber = 'Contact number is required';
                } else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(value.replace(/\s/g, ''))) {
                    newErrors.contactNumber = 'Please enter a valid phone number';
                } else {
                    delete newErrors.contactNumber;
                }
                break;
            case 'age':
                if (value && (isNaN(parseInt(value)) || parseInt(value) < 5 || parseInt(value) > 120)) {
                    newErrors.age = 'Please enter a valid age (5-120)';
                } else {
                    delete newErrors.age;
                }
                break;
        }

        setErrors(newErrors);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const dataToSubmit = {
                name: formData.name,
                email: formData.email,
                contactNumber: formData.contactNumber,
                ...(formData.age && { age: parseInt(formData.age) }),
                ...(formData.school && { school: formData.school }),
            };

            await subscribe(dataToSubmit);

            setSuccess(true);
            setFormData({ name: '', email: '', contactNumber: '', age: '', school: '' });
            setTouched({});
            setErrors({});

            setTimeout(() => setSuccess(false), 5000);
        } catch (error) {
            console.error('Subscription error:', error);
        }
    };

    return (
        <AnimatePresence mode="wait">
            {success ? (
                <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center py-16 px-8"
                >
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
                    </motion.div>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                        Welcome to ICORE!
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
                        Thanks for joining. Check your email for updates on our upcoming Practical Engineering Course.
                    </p>

                    <Button
                        onClick={() => setSuccess(false)}
                        variant="outline"
                        className="border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/50"
                    >
                        Subscribe Another Person
                    </Button>
                </motion.div>
            ) : (
                <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-8 space-y-5"
                >
                    {/* Name Field */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="space-y-2"
                    >
                        <Label
                            htmlFor="name"
                            className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2"
                        >
                            <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            Full Name
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500 ${errors.name && touched.name ? 'border-red-500 focus:border-red-500' : ''
                                }`}
                        />
                        <AnimatePresence>
                            {errors.name && touched.name && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center gap-2 text-red-500 text-sm"
                                >
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.name}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Email Field */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-2"
                    >
                        <Label
                            htmlFor="email"
                            className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2"
                        >
                            <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500 ${errors.email && touched.email ? 'border-red-500 focus:border-red-500' : ''
                                }`}
                        />
                        <AnimatePresence>
                            {errors.email && touched.email && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center gap-2 text-red-500 text-sm"
                                >
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.email}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Contact Number Field */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="space-y-2"
                    >
                        <Label
                            htmlFor="contactNumber"
                            className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2"
                        >
                            <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            Phone
                        </Label>
                        <Input
                            id="contactNumber"
                            name="contactNumber"
                            type="tel"
                            placeholder="+94 77 123 4567"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500 ${errors.contactNumber && touched.contactNumber ? 'border-red-500 focus:border-red-500' : ''
                                }`}
                        />
                        <AnimatePresence>
                            {errors.contactNumber && touched.contactNumber && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center gap-2 text-red-500 text-sm"
                                >
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.contactNumber}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Optional Fields Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {/* Age Field */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="age"
                                className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2"
                            >
                                <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                Age
                            </Label>
                            <Input
                                id="age"
                                name="age"
                                type="number"
                                placeholder="Age"
                                value={formData.age}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                min="5"
                                max="120"
                                className={`bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500 ${errors.age && touched.age ? 'border-red-500 focus:border-red-500' : ''
                                    }`}
                            />
                            <AnimatePresence>
                                {errors.age && touched.age && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex items-center gap-1 text-red-500 text-xs"
                                    >
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.age}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* School Field */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="school"
                                className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2"
                            >
                                <School className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                School
                            </Label>
                            <Input
                                id="school"
                                name="school"
                                type="text"
                                placeholder="Your school"
                                value={formData.school}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500"
                            />
                        </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                    >
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Subscribing...
                                </>
                            ) : (
                                'Subscribe Now'
                            )}
                        </Button>
                    </motion.div>
                </motion.form>
            )}
        </AnimatePresence>
    );
};