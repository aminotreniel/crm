# Cortada CRM design system

## Direction

Calm, trustworthy, and operational. The CRM uses cool blue slate neutrals to make long working sessions feel less stark than pure white or pure black, with one restrained blue accent for actions, selection, and progress.

## Palette

| Role | Light mode | Dark mode | Purpose |
| --- | --- | --- | --- |
| Workspace | `#F4F7FA` | `#111E29` | Low glare application canvas |
| Surface | `#FFFFFF` | `#172936` | Cards, panels, and header |
| Raised surface | `#EAF0F5` | `#203847` | Inputs and quiet emphasis |
| Primary text | `#1B3445` | `#EDF6FA` | Headings and critical data |
| Supporting text | `#405D70` | `#C1D4DF` | Explanatory copy and labels |
| Accent | `#245F8D` | `#84C9E6` | Calls to action, selection, and progress |
| Navigation | `#153A52` | `#0D1B25` | Focused, separate navigation area |

Semantic tokens live in `apps/web/app/globals.css`. Components consume roles such as `--surface`, `--text`, `--action`, and `--focus`, so the palette can evolve without rewriting individual components.

## Theme behavior

The CRM defaults to light mode before 6 PM and dark mode from 6 PM onward. The header toggle gives users control; their chosen mode is saved locally and takes precedence over the automatic setting.

## Accessibility checks

Measured contrast ratios for the active tokens:

- Light primary text on workspace: 12.03:1
- Light supporting text on workspace: 6.47:1
- Light action text: 6.78:1
- Dark primary text on workspace: 15.44:1
- Dark supporting text on workspace: 11.08:1
- Dark action text: 8.99:1

All of these exceed the WCAG AA 4.5:1 normal text requirement. Keyboard controls now receive a three pixel visible focus ring with at least 5.69:1 contrast in light mode and 9.65:1 in dark mode.
