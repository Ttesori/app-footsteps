## 6/2/2022

- First pass at mobile styling complete - will work on add/update hike form next.

## 5/23/2022

- Began working on mobile styling, beginning with hikes list.

## 3/9/2022

- WOrked on trying to figure out why I was having issues with fetch being in context and after spending several hours on it, I decided to let it go and worry about code optimization another time. Instead I prepped the code for styling; added a layout component and created variables for fonts and colors.

## 3/7/2022

- Added filtering by date, using dayjs. Tried to do it with native Date but it got way too complicated. Still need to go back and implement dayjs where I had previously used Date
- Fixed an infinite loop I somehow caused when moving fetch calls to context - still need to clean this up and figure out how to refactor, but it's working for now.
- Added modal for create/edit/delete
- Added searching name, location and notes

## 3/6/2022

- Left off on cleaning up prop drilling in Dashboard
- Cleaned up fetches by adding generic fetch to context
- Created context and began cleaning up drilled props
- Got Delete functionality working.
- Starting list of eventual features:
  -- Search hikes
  -- Loading skeleton
  -- Change unit miles/kilometers
  -- Add photo for hike
  -- Modal for create/edit
  -- Confirm for delete
  -- Toast for alerts

## 3/5/2022

- Got CRU working on the front end. Planning to add D tomorrow or Monday. Ran into some organization issues that could be helped by integrating Context API but okay with prop drilling for now
- Looking forward to implementing react router
- Almost added momentJS for dates, but decided to manually transform them for now since I only needed basic transforms in 2 places
- Got stuck for a bit trying to figure out why a prop wasn't updating with useEffect, only to realize I forgot to add the curly braces around the variable name in the component's function parameter - whoopsies!
- Resisting the urge to do any styling is a challenge, but it's good to focus on semantic HTML. Also want to be sure to implement accessibility features before beginning styling
