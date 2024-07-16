"use client";
import React from 'react'
import { sendEmail } from '@/app/actions'
import { Button } from "@/components/ui/button"


const MailSender = () => {
    const triggerEmail = async () => {
        let values = {
            name: "Salem",
            email: "dorwinkingston@fizuro.com",
            subject: "New Test Mail",
            message: "This is a test mail"
        }

        await sendEmail(values);
    }
  return (
    <Button variant="outline" onClick={() => {triggerEmail()}}>Send Test Mail</Button>

  )
}

export default MailSender