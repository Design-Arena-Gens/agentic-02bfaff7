import { NextRequest, NextResponse } from 'next/server'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

// Enhanced AI response logic
function generateResponse(userMessage: string, history: Message[]): string {
  const lowerMessage = userMessage.toLowerCase()

  // Account Issues
  if (lowerMessage.includes('login') || lowerMessage.includes('sign in') || lowerMessage.includes('can\'t access')) {
    return `I understand how frustrating login issues can be — let me help you get back into your account.\n\nPlease try these steps:\n\n• Clear your browser cache and cookies\n• Try incognito/private browsing mode\n• Reset your password using the "Forgot Password" link\n• Check if your email is verified\n\nIf none of these work, please let me know and I'll escalate this to ensure you get access quickly.\n\nDoes this help resolve your issue?`
  }

  if (lowerMessage.includes('password') && (lowerMessage.includes('reset') || lowerMessage.includes('forgot') || lowerMessage.includes('change'))) {
    return `I can help you reset your password right away.\n\nHere's what to do:\n\n• Go to the login page\n• Click "Forgot Password"\n• Enter your registered email\n• Check your inbox for a reset link (check spam folder too)\n• Create your new password\n\nThe link expires in 24 hours. If you don't receive it within 5 minutes, please let me know.\n\nDoes this solve your issue?`
  }

  if (lowerMessage.includes('email') && (lowerMessage.includes('change') || lowerMessage.includes('update'))) {
    return `I can guide you through changing your email address.\n\nSteps:\n\n• Go to Settings → Account\n• Click "Change Email"\n• Enter your new email\n• Verify it through the confirmation link sent to both old and new emails\n\nFor security reasons, this process requires verification from both email addresses.\n\nDoes this help?`
  }

  if (lowerMessage.includes('delete') && lowerMessage.includes('account')) {
    return `I understand you'd like to delete your account. Before we proceed, I want to make sure you're aware:\n\n• All your data will be permanently deleted\n• Active subscriptions will be cancelled\n• This action cannot be undone\n\nIf you're sure, here's how:\n\n• Go to Settings → Account → Delete Account\n• Confirm your password\n• Follow the verification steps\n\nIf there's an issue we can help resolve instead, I'm here to help.\n\nWould you like to proceed, or is there something we can improve?`
  }

  // Billing & Payments
  if (lowerMessage.includes('payment') && lowerMessage.includes('fail')) {
    return `I understand how worrying that can be — thanks for letting us know.\n\nSometimes banks temporarily hold the amount even if payment fails.\n\nPlease try this:\n\n• Wait 24 hours — banks usually auto-reverse failed payments\n• Check your bank statement\n• Try using a different payment method\n• Ensure your card has sufficient funds and international transactions are enabled\n\nIf the amount is not reversed within 24 hours, I'll escalate this immediately.\n\nCould you please confirm if 24 hours have passed?`
  }

  if (lowerMessage.includes('refund')) {
    return `I understand you'd like a refund. Let me help you with that.\n\nOur refund policy:\n\n• Refunds are processed within 5-7 business days\n• Eligible if requested within 30 days of purchase\n• Subscription refunds are prorated\n\nTo process your refund, I need to verify:\n\n• Your account email\n• Reason for refund (optional, helps us improve)\n\nOnce confirmed, I'll initiate the refund immediately.\n\nCould you please confirm your registered email?`
  }

  if (lowerMessage.includes('subscription') || lowerMessage.includes('plan')) {
    if (lowerMessage.includes('cancel')) {
      return `I understand you're considering cancelling. Before we proceed, I'd like to understand if there's anything we can help with.\n\nTo cancel:\n\n• Go to Settings → Billing\n• Click "Cancel Subscription"\n• Choose cancellation reason (helps us improve)\n• Confirm cancellation\n\nYou'll retain access until the end of your billing period.\n\nIs there a specific issue we can resolve, or would you like to proceed with cancellation?`
    }
    if (lowerMessage.includes('upgrade') || lowerMessage.includes('downgrade') || lowerMessage.includes('change')) {
      return `I can help you change your subscription plan.\n\nSteps:\n\n• Go to Settings → Billing\n• Click "Change Plan"\n• Select your desired plan\n• Confirm changes\n\nChanges take effect:\n• Upgrades: Immediately (prorated charge)\n• Downgrades: Next billing cycle\n\nWould you like to know more about any specific plan features?`
    }
    return `I'd be happy to help with your subscription.\n\nWe offer:\n\n• Free Plan: Basic features, perfect for getting started\n• Pro Plan ($29/month): Advanced features, priority support\n• Enterprise: Custom solutions, dedicated account manager\n\nWhat would you like to know more about?`
  }

  if (lowerMessage.includes('invoice') || lowerMessage.includes('receipt')) {
    return `I can help you get your invoice.\n\nTo download invoices:\n\n• Go to Settings → Billing → Invoices\n• Select the billing period\n• Click "Download PDF"\n\nAll invoices are also automatically emailed to your registered email address.\n\nIf you need invoices sent to a different email or have billing questions, please let me know.\n\nDoes this help?`
  }

  // Product Usage
  if (lowerMessage.includes('how to') || lowerMessage.includes('how do i') || lowerMessage.includes('help with')) {
    return `I'm here to guide you through using our features.\n\nTo help you better, could you please let me know:\n\n• Which specific feature you need help with?\n• What you're trying to accomplish?\n\nAlternatively, you can:\n\n• Check our Help Center for step-by-step guides\n• Watch video tutorials\n• Join our community forum\n\nWhat feature would you like to learn about?`
  }

  if (lowerMessage.includes('feature') && (lowerMessage.includes('available') || lowerMessage.includes('have') || lowerMessage.includes('support'))) {
    return `I'd be happy to help clarify our feature availability.\n\nCould you tell me which specific feature you're asking about?\n\nMeanwhile, here's a quick overview:\n\n• Free Plan: Core features, basic support\n• Pro Plan: All features, priority support, advanced analytics\n• Enterprise: Everything + custom integrations, dedicated support\n\nWhich feature are you interested in?`
  }

  // Bugs & Errors
  if (lowerMessage.includes('error') || lowerMessage.includes('not working') || lowerMessage.includes('broken') || lowerMessage.includes('bug')) {
    return `I'm sorry you're experiencing this issue. Let me help you troubleshoot.\n\nPlease try these steps:\n\n• Refresh the page (Ctrl+F5 or Cmd+Shift+R)\n• Clear browser cache and cookies\n• Try a different browser\n• Check if the issue persists in incognito mode\n• Update your app to the latest version\n\nIf the issue continues, please provide:\n\n• What exactly happened?\n• Any error message you saw\n• Browser/device you're using\n\nThis will help me escalate to our technical team if needed.\n\nDoes the issue still occur after trying these steps?`
  }

  if (lowerMessage.includes('slow') || lowerMessage.includes('loading') || lowerMessage.includes('performance')) {
    return `I understand slow performance can be frustrating. Let's fix this.\n\nQuick fixes:\n\n• Check your internet connection\n• Close unnecessary browser tabs\n• Clear browser cache\n• Disable browser extensions temporarily\n• Try a different network\n\nIf you're still experiencing slowness:\n\n• Let me know your location (helps identify server issues)\n• Share what specific action is slow\n\nThis helps our team optimize performance in your region.\n\nIs the performance better after trying these steps?`
  }

  if (lowerMessage.includes('crash') || lowerMessage.includes('freeze') || lowerMessage.includes('stuck')) {
    return `I'm sorry the app is crashing. Let's resolve this right away.\n\nImmediate steps:\n\n• Force close and restart the app\n• Restart your device\n• Update to the latest version\n• Free up device storage (crashes often happen when storage is low)\n• Reinstall the app (your data is safely stored in the cloud)\n\nIf crashes continue, please share:\n\n• Device model and OS version\n• When crashes happen (specific action or random?)\n• Any error message\n\nI'll escalate this to our technical team for urgent resolution.\n\nDoes the app work after trying these steps?`
  }

  // Pricing & Sales
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
    return `I'd be happy to explain our pricing.\n\nOur plans:\n\n• Free: $0/month — Core features, perfect for individuals\n• Pro: $29/month — All features, priority support, advanced tools\n• Enterprise: Custom pricing — Dedicated support, custom integrations, SLA\n\nAll paid plans include:\n✓ 30-day money-back guarantee\n✓ Cancel anytime\n✓ Secure payment processing\n\nThis feature is available in Pro and saves most users 5-10 hours per month.\n\nWould you like to know more about any specific plan?`
  }

  if (lowerMessage.includes('discount') || lowerMessage.includes('coupon') || lowerMessage.includes('promo')) {
    return `Great question about discounts!\n\nCurrent offers:\n\n• Annual plans: 20% off (compared to monthly)\n• Students/Non-profits: 50% off (verification required)\n• First-time users: 14-day free trial of Pro features\n\nTo apply a discount code:\n\n• Go to Settings → Billing\n• Click "Apply Coupon"\n• Enter your code\n\nIf you have a specific coupon code and it's not working, please share the code and I'll verify it for you.\n\nWould you like to know more about any of these offers?`
  }

  if (lowerMessage.includes('enterprise') || lowerMessage.includes('business') || lowerMessage.includes('team')) {
    return `Thank you for your interest in our Enterprise solution!\n\nEnterprise includes:\n\n• Custom pricing based on your needs\n• Dedicated account manager\n• Priority support with SLA\n• Custom integrations\n• Advanced security features\n• Onboarding assistance\n• Training for your team\n\nI'd love to connect you with our Enterprise team.\n\nCould you share:\n\n• Company name\n• Team size\n• Specific requirements\n\nThey'll reach out within 24 hours with a tailored proposal.\n\nWould you like me to set up that connection?`
  }

  // Angry/Complaint handling
  if (lowerMessage.includes('angry') || lowerMessage.includes('frustrated') || lowerMessage.includes('terrible') || lowerMessage.includes('worst') || lowerMessage.includes('disappointed')) {
    return `I sincerely apologize for the frustration you're experiencing. I understand how disappointing this must be.\n\nYour concerns are important to us. I want to make this right.\n\nCould you please tell me:\n\n• What specifically went wrong?\n• What outcome would resolve this for you?\n\nI'm here to find a solution or escalate this to ensure it's handled properly.\n\nThank you for giving us the opportunity to make this better.`
  }

  // Escalation requests
  if (lowerMessage.includes('human') || lowerMessage.includes('speak to') || lowerMessage.includes('talk to') || lowerMessage.includes('representative') || lowerMessage.includes('manager')) {
    return `I'm escalating this to our human support team right away.\n\nYou'll hear back within 24 hours at your registered email.\n\nIn the meantime, if you'd like to share more details about your issue, it will help our team assist you faster.\n\nIs there anything else I can help document for the team?`
  }

  // Greeting responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi ') || lowerMessage.startsWith('hi') || lowerMessage.includes('hey')) {
    return `Hello! I'm here to help you with any questions or concerns.\n\nI can assist with:\n\n• Account issues\n• Billing and payments\n• Product features and guidance\n• Technical problems\n• Pricing and plans\n\nHow can I help you today?`
  }

  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
    return `You're very welcome! I'm glad I could help.\n\nIf you need anything else, I'm here anytime. Have a great day!`
  }

  // Default response
  return `I want to make sure I understand your request correctly and provide accurate information.\n\nCould you please provide a bit more detail about:\n\n• What specific issue you're experiencing?\n• What you're trying to accomplish?\n• Any error messages you've seen?\n\nThis will help me give you the most relevant solution.\n\nAlternatively, I can help with:\n\n• Account & login issues\n• Billing & payments\n• Product usage questions\n• Bug reports\n• Pricing information\n\nWhat brings you here today?`
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message' },
        { status: 400 }
      )
    }

    const response = generateResponse(message, history || [])

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
