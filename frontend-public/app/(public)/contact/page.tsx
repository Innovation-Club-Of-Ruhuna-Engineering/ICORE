import { Navigation } from '@/components/shared/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react'

export default function Page() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="bg-gradient-to-b from-blue-50 to-white pt-28">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6">Contact Us</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Have questions or suggestions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4  md:py-24">
        <div className="max-w-2xl mx-auto">          
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                placeholder="Your name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <Input
                id="subject"
                placeholder="What is your message about?"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Your message here..."
                className="min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>
            
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}