

## Make the Contact/Footer Section More Compact

The contact section currently has generous padding and spacing. Here's what will change:

### Changes to `src/components/orbit/ContactSection.tsx`

- Reduce section vertical padding from `py-20 sm:py-32` to `py-12 sm:py-20`
- Reduce heading bottom margin from `mb-4 sm:mb-6` to `mb-3 sm:mb-4`
- Reduce subtitle bottom margin from `mb-8 sm:mb-10` to `mb-6 sm:mb-8`
- Reduce heading font sizes from `text-2xl sm:text-4xl lg:text-5xl` to `text-xl sm:text-3xl lg:text-4xl`
- Reduce CTA button padding from `px-6 sm:px-10 py-4 sm:py-5` to `px-5 sm:px-8 py-3 sm:py-4`

### Changes to `src/components/orbit/OrbitFooter.tsx`

- Reduce footer padding from `py-8 sm:py-10` to `py-5 sm:py-6`
- Reduce bottom padding from `pb-28 sm:pb-10` to `pb-24 sm:pb-6`
- Reduce internal gap from `gap-4` to `gap-2`

This will result in a noticeably more compact footer area while keeping all content readable and well-spaced.

