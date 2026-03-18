Inspired by PewDiePie wideo (https://www.youtube.com/watch?v=5nL-Eq1lpDU), I decided to code for myself a blocker for some of youtube features. 
I used tampermoneky, and thats recomended way of using this code.

1. Blocker for shorts in subscriptions feed (Didn't watch them either way, so why not delete them?) (DONE!)
2. No videos main page (Taking back freedom of deciding what to watch) (DONE!)
3. No recomended next videos (work in progress)
To be continued...


Main trouble:
Youtube is SPA (single-page-application), and tampermonkey works on URL names. When entering youtube.com, the code would work, 
but then changing to subscriptions feed, it would not. The result was to create listener for changing URL, fortunately youtube
has it's own event ("yt-navigate-finish"). 
