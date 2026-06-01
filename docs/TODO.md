# Mindful Mama — TODO

## High Priority (Before Launch)

- [ ] **Age/life-stage filtering for micro-guides** — Don't show perimenopause/PMDD content to younger moms. Add a simple life-stage question (postpartum, toddler years, school-age, perimenopause) and filter guide selection accordingly.
- [ ] **Backend + Auth** — Move from localStorage to a real database (Supabase or Firebase). Enables: accounts, cross-device sync, email communication, payment, and data persistence.
- [ ] **Payment integration** — Stripe subscription ($9.99/month or $79/year). Free tier: snapshot + archetype + 2 pathways + limited coach. Paid: everything.
- [ ] **Email capture** — Optional "save my progress" after archetype reveal. Builds list for marketing + time capsule notifications + weekly summaries.
- [ ] **PWA setup** — Service worker + manifest for push notifications. Enables: morning check-in reminders, time capsule alerts, coach messages, weekly summary delivery.

## Medium Priority (Post-Launch, Based on User Data)

- [ ] **Checklist daily auto-reset** — Morning routine, evening reset, and leaving-the-house checklists should clear each morning. Grocery list and meal rotation should persist until manually cleared.
- [ ] **Editable meal rotation** — Let users fill in and save their own meals (currently just blank lines).
- [ ] **Grocery list customization** — Let users add/remove items from the staples list and save their version.
- [ ] **Weekly "State of You" email** — Auto-generated summary sent every Monday (requires email + backend).
- [ ] **Proactive coach as push notification** — Currently only shows on dashboard visit. With PWA, send as actual notification.
- [ ] **Seasonal content drops** — Gate guides by season (holiday survival in Nov, back-to-school in Aug, summer break in June). Create anticipation.
- [ ] **"What Worked" integration with coach** — Coach already receives the data. Make it more conversational: "Last time you tried X and it helped. Want to try it again?"
- [ ] **Archetype-specific One Thing Today** — Weight the daily action pool more heavily toward the user's archetype needs.

## Growth / Viral

- [ ] **"What's Your Type?" social campaign** — Use /quiz page as the viral entry point. Create shareable archetype cards (image format for Instagram/stories).
- [ ] **Archetype comparison** — "Share your type with a friend. Compare." Two users discovering different types = organic conversation.
- [ ] **Partner onboarding flow** — When she shares with partner, give them a mini-experience: "Your partner is a Plate Spinner. Here's what that means and 3 things you can do this week."
- [ ] **Referral rewards** — Track referrals, reward with extended free trial or premium features.
- [ ] **SEO landing pages** — One page per archetype (/type/plate-spinner) optimized for search. "ADHD mom overwhelm" keywords.

## Content Expansion

- [ ] **Micro-guides to 150+** — Add guides for: ADHD and work, ADHD and finances, ADHD and holidays, ADHD and travel with kids, ADHD and school systems, ADHD and medical appointments.
- [ ] **Script library expansion** — More scripts for: teacher conferences, family boundaries, saying no to volunteering, asking partner for specific help, explaining ADHD to family.
- [ ] **Archetype-specific guide packs** — 5-7 guides curated specifically for each archetype as a "starter pack."
- [ ] **Audio versions** — Some users can't read when depleted. 2-minute audio versions of micro-guides for listening while driving/walking.

## Technical Debt

- [ ] **Remove old /original-assessment page** — Legacy 25-question assessment. No longer linked but still exists.
- [ ] **Remove old /dashboard/refer page** — Already deleted but verify no orphan references.
- [ ] **Remove old /dashboard/archetype page** — Replaced by /dashboard/me. Redirect or remove.
- [ ] **Consolidate printables-content.ts and printables-data.ts** — Two files serving similar purposes. The HTML content file is only used for printing; could be generated from the data file.
- [ ] **Add error boundaries** — No error handling on localStorage failures or API errors in engagement components.
- [ ] **Performance audit** — Dashboard loads a LOT of components. Consider lazy loading below-the-fold engagement cards.
- [ ] **Accessibility audit** — Ensure all interactive elements have proper ARIA labels, focus management, and keyboard navigation.

## Future Features (Validated by User Demand)

- [ ] **Community** — "Connect with other Plate Spinners." Forum or group chat by archetype.
- [ ] **Therapist directory** — Curated list of ADHD-informed therapists by location.
- [ ] **Partner app/view** — Separate lightweight experience for partners to understand and support.
- [ ] **Child development tracker** — Age-appropriate expectations + ADHD-informed parenting tips by child's age.
- [ ] **Cycle tracking integration** — Connect with period tracking apps to auto-adjust expectations during luteal phase.
- [ ] **Wearable integration** — Pull sleep/HRV data to inform energy predictions and coach messages.
