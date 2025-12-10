"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNewsletterSubscription } from '@/hooks/useNewsletterSubscription';
import { motion } from 'framer-motion';
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
            newErrors.email = 'Please enter a valid email address';
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
                    newErrors.email = 'Please enter a valid email address';
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

    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-12"
            >
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">Subscription Successful!</h2>
                <p className="text-muted-foreground mb-6">
                    Thank you for subscribing to the ICORE Newsletter. We'll keep you updated on the Practical Engineering Course and other exciting events!
                </p>
                <Button onClick={() => setSuccess(false)} variant="outline">
                    Subscribe Another Person
                </Button>
            </motion.div>
        );
    }

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full space-y-6 bg-card p-8 rounded-lg border border-border shadow-lg"
        >
            <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name *
                </Label>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.name && touched.name ? 'border-red-500' : ''}
                />
                {errors.name && touched.name && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email *
                </Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.email && touched.email ? 'border-red-500' : ''}
                />
                {errors.email && touched.email && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="contactNumber" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Contact Number *
                </Label>
                <Input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    placeholder="Enter your phone number (e.g., +94 77 123 4567)"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.contactNumber && touched.contactNumber ? 'border-red-500' : ''}
                />
                {errors.contactNumber && touched.contactNumber && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.contactNumber}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="age" className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Age (Optional)
                    </Label>
                    <Input
                        id="age"
                        name="age"
                        type="number"
                        placeholder="Enter your age"
                        value={formData.age}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        min="5"
                        max="120"
                        className={errors.age && touched.age ? 'border-red-500' : ''}
                    />
                    {errors.age && touched.age && (
                        <div className="flex items-center gap-2 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {errors.age}
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="school" className="flex items-center gap-2">
                        <School className="w-4 h-4" />
                        School (Optional)
                    </Label>
                    <Input
                        id="school"
                        name="school"
                        type="text"
                        placeholder="Enter your school name"
                        value={formData.school}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </div>
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Subscribing...
                    </>
                ) : (
                    'Subscribe to Newsletter'
                )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
                * Required fields
            </p>
        </motion.form>
    );
};