# Kit.com (ConvertKit) Email Automation Setup

## Overview
This guide explains how to set up the automated welcome email for presale waitlist subscribers.

---

## Step 1: Create Email Template

1. Go to **Kit.com** → **Send** → **Email templates**
2. Click **+ New template**
3. Choose **Start from scratch** or **Import HTML**
4. Copy the contents of `welcome-presale.html` into the HTML editor
5. Name it: `Presale Waitlist Welcome`
6. Save the template

---

## Step 2: Create Visual Automation

1. Go to **Automate** → **Visual Automations**
2. Click **+ New Automation**
3. Choose trigger: **Joins a form**
4. Select your waitlist form (ID: 9023867)

### Automation Flow:

```
[Trigger: Joins Form]
        ↓
[Wait: 1 minute] (optional, for better deliverability)
        ↓
[Send Email: Presale Waitlist Welcome]
        ↓
[Tag: presale-waitlist]
```

---

## Step 3: Configure Email Content

When editing the email in the automation:

### Subject Line Options:
- `You're on the $SENTINEL Presale Waitlist 🎉`
- `Welcome! Your PinkSale Presale Access is Confirmed`
- `🚀 You're In! $SENTINEL Presale Waitlist Confirmed`

### Preview Text:
`Early Bird at $0.015 — Listing price will be $0.04`

### Sender Details:
- **From Name:** AegisSentinel
- **From Email:** contact@aegissentinel.online
- **Reply-To:** contact@aegissentinel.online

---

## Step 4: Variables & Personalization

Kit.com uses Liquid templating. Available variables:

| Variable | Description |
|----------|-------------|
| `{{ subscriber.first_name }}` | Subscriber's first name |
| `{{ subscriber.email_address }}` | Subscriber's email |
| `{{ unsubscribe_url }}` | Auto-generated unsubscribe link |

### Example personalization:
```html
<p>Hey {{ subscriber.first_name | default: "there" }}!</p>
```

---

## Step 5: Test the Automation

1. Click **Preview** to see the email
2. Send a **Test email** to yourself
3. Check both HTML and plain text versions
4. Verify all links work correctly
5. **Activate** the automation when ready

---

## Step 6: Additional Sequence Emails (Optional)

Consider adding follow-up emails:

### Email 2 (Day 3): Tokenomics Deep Dive
- Subject: `How $SENTINEL's 5-Layer Burn Mechanism Works`
- Content: Explain burn mechanics, show deflationary projections

### Email 3 (Day 7): Presale Countdown
- Subject: `PinkSale Launch Date Announced 📅`
- Content: Specific date, whitelist instructions, countdown

### Email 4 (Launch Day): GO LIVE!
- Subject: `🚨 LIVE NOW: $SENTINEL Presale on PinkSale`
- Content: Direct link, how to participate, deadline

---

## Tagging Strategy

Use these tags for segmentation:

| Tag | When Applied |
|-----|--------------|
| `presale-waitlist` | Joined waitlist form |
| `presale-participant` | Purchased in presale |
| `newsletter` | Opted into newsletter |
| `enterprise-lead` | Expressed enterprise interest |

---

## Form ID Reference

- **Waitlist Form ID:** 9023867
- **API Endpoint:** `https://api.convertkit.com/v3/forms/9023867/subscribe`

---

## Support

- Kit.com Help: https://help.kit.com
- AegisSentinel Team: contact@aegissentinel.online
