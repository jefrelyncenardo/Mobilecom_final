# Components Directory

This directory is for reusable React Native components that can be used across multiple screens.

## Structure

```
components/
├── ui/           # Basic UI components (buttons, inputs, etc.)
├── forms/        # Form-related components
├── navigation/   # Navigation-related components
└── common/       # Common utility components
```

## Guidelines

- Each component should be in its own file
- Use TypeScript for all components
- Include proper prop types and interfaces
- Follow the existing styling patterns
- Add JSDoc comments for complex components

## Example Component

```typescript
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export default function CustomButton({ 
  title, 
  onPress, 
  variant = 'primary' 
}: CustomButtonProps) {
  return (
    <TouchableOpacity 
      style={[styles.button, styles[variant]]} 
      onPress={onPress}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: '#e67e22',
  },
  secondary: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#333',
  },
});
```