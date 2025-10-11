# Advanced Layout Component

This document describes the new `AdvancedLayout` component that provides enhanced UI features including custom cursors, 3D backgrounds, and glassmorphism effects.

## Features

### 🎯 Custom Cursor
- Interactive cursor that follows mouse movement
- Smooth animations with easing
- Hover effects on interactive elements
- Can be disabled for accessibility

### ✨ Glassmorphism UI
- Beautiful glass-like cards with backdrop blur
- Semi-transparent backgrounds
- Smooth border effects
- Optimized for performance

### ⚡ Smooth Animations
- Lightning-fast transitions (0.15s)
- Optimized for 60 FPS
- Reduced motion support
- Will-change properties for performance

### 📄 Print Support
- PDF export functionality
- Optimized print styles
- Clean black and white output
- Page break controls

### 🌓 Theme Support
- Seamless dark/light theme switching
- Consistent with existing theme system
- Smooth color transitions

### 📱 Responsive Design
- Mobile-first approach
- Adaptive sidebar sizing
- Touch-friendly interactions

## Usage

### Basic Usage

```tsx
import AdvancedLayout from "./components/AdvancedLayout";

export default function MyPage() {
  return (
    <AdvancedLayout>
      <div>Your content here</div>
    </AdvancedLayout>
  );
}
```

### Advanced Configuration

```tsx
import AdvancedLayout from "./components/AdvancedLayout";

export default function MyPage() {
  return (
    <AdvancedLayout 
      currentPageName="Dashboard"
      show3DBackground={true}
      enableCustomCursor={true}
      enablePrint={true}
    >
      <div>Your content here</div>
    </AdvancedLayout>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Content to render inside the layout |
| `currentPageName` | `string` | `'Dashboard'` | Current page name for navigation |
| `show3DBackground` | `boolean` | `false` | Enable 3D Spline background |
| `enableCustomCursor` | `boolean` | `true` | Enable custom cursor effects |
| `enablePrint` | `boolean` | `true` | Show print/download button |

## Navigation Items

The component supports different navigation configurations:

### Dashboard Navigation
- Dashboard, Projects, Library, AI Models
- Contactpersonen, Offertes, Facturatie
- Email, WhatsApp, Omgeving
- Team, Updates, History

### Custom Navigation
You can extend the `navigationItems` object to add your own navigation sections:

```tsx
const customNavigation = {
  MySection: [
    { title: "Page 1", id: "page1", icon: Home, href: "/page1" },
    { title: "Page 2", id: "page2", icon: Settings, href: "/page2" },
  ]
};
```

## Styling

### CSS Classes

The component includes several utility classes:

- `.custom-cursor-area` - Disables default cursor
- `.glass-card` - Glassmorphism effect
- `.fade-in` - Fade in animation
- `.animate-fade-in-fast` - Fast fade in animation
- `.custom-scrollbar` - Custom scrollbar styling

### Print Styles

Print styles are automatically applied when printing:

- Backgrounds become white
- Text becomes black
- 3D backgrounds are hidden
- Sidebar is hidden
- Optimized for PDF export

## Performance Optimizations

- `will-change` properties for smooth animations
- Passive event listeners for better performance
- Intersection Observer for scroll detection
- RequestAnimationFrame for cursor animations
- Optimized CSS transitions

## Accessibility

- Proper ARIA labels
- Keyboard navigation support
- Reduced motion support
- Screen reader friendly
- High contrast support

## Browser Support

- Modern browsers with CSS Grid support
- Backdrop-filter support for glassmorphism
- Intersection Observer API support
- RequestAnimationFrame support

## Examples

### Demo Page
Visit `/dashboard/advanced` to see the component in action with a full demo.

### Integration with Existing Dashboard
The component is designed to work alongside the existing dashboard layout. You can use it for specific pages that need enhanced UI features.

## Troubleshooting

### Custom Cursor Not Working
- Ensure `enableCustomCursor` is set to `true`
- Check that the component is rendered on the client side
- Verify that no other CSS is overriding cursor styles

### 3D Background Not Loading
- Check your internet connection
- Ensure `show3DBackground` is set to `true`
- Verify the Spline iframe URL is accessible

### Print Styles Not Applied
- Use the browser's print preview
- Ensure `enablePrint` is set to `true`
- Check that print media queries are supported

## Future Enhancements

- More animation presets
- Additional cursor styles
- More 3D background options
- Advanced print customization
- Mobile-specific optimizations
