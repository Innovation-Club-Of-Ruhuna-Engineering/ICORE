'use client'

import ProfileCard from '@/components/me/profile-card'
import { Header } from '@/components/shared/header'
import backdrop from "@/assets/me/backdrop-profile.png"
import profilePic from "@/assets/me/profile-pic.jpg"
import { profileApi, UserProfileByUsernameResponse } from '@/lib/profile/profileMethods'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const { username } = useParams<{ username: string }>()
  const [profile, setProfile] = useState<UserProfileByUsernameResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (username) {
      profileApi.getProfileByUsername(username as string)
        .then(data => setProfile(data))
        .finally(() => setLoading(false))
    }
  }, [username])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-[#ECF0FF] flex-1">
        <div className="w-2/3 mx-auto my-12 flex flex-col gap-6">
          {loading ? (
            <div>Loading...</div>
          ) : profile ? (
            <ProfileCard
              backdrop={backdrop.src}
              profilepic={profilePic.src}
              name={`${profile.firstName} ${profile.lastName}`}
              username={`@${username}`}
              since={`Joined ${new Date(profile.createdAt).toLocaleString('default', { month: 'short', year: 'numeric' })}`}
              social={{
                github: "github",
                linkedin: "linkedin",
                website: "web",
                youtube: "youtube",
              }}
            />
          ) : (
            <div>User not found.</div>
          )}

          
        </div>
      </div>
    </div>
  )
}

export default Page

//profile contains the user id. using that user id, fetch projects that this specific user has created
// and display them in a section below the profile card.