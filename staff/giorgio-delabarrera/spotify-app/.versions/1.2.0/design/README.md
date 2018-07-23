
# Spotify App

## Components

- site-nav
- recently-played
- search
- artist-list-item
- artist-detail
- album-list-item
- album-detail
- track-list-item
- player

## SASS Structure

```
sass/
  base/
    _reset.sass
    _typography.sass
  components/
    _site-nav.sass
    _recently-played.sass
    _search.sass
    _artist-list-item.sass
    _artist-detail.sass
    _album-list-item.sass
    _album-detail.sass
    _track-list-item.sass
    _player.sass
  helpers/
    _helper.sass
  layout/
    _sidebar.sass
    _footer.sass
  main.sass
```

## BEM

- [site-nav](#site-nav)
- [recently-played](#recently-played)
- [search](#search)
- [artist-list](#artist-list)
- [artist-list-item](#artist-list-item)
- [artist-detail](#artist-detail)
- [album-list](#album-list)
- [album-list-item](#album-list-item)
- [album-detail](#album-detail)
- [track-list-item](#track-list-item)
- [player](#player)

### Site Nav

__Block__

- site-nav

__Elements__

- site-nav__list
- site-nav__list-item
- site-nav__link
- site-nav__link-icon
- site-nav__link-text

### Last Reproduced

__Block__

- recently-played

__Elements__

- recently-played__title
- recently-played__list
- recently-played__list-item

### Search

__Block__

- search

__Elements__

- search__label
- search__input

### Artist List

__Block__

- artist-list

### Artist List Item

__Block__

- artist-list-item

__Elements__

- artist-list-item__image
- artist-list-item__title

### Artist Detail

__Block__

- artist-detail

__Elements__

- artist-detail__title

### Album List

__Block__

- album-list

__Elements__

- album-list__title

### Album List Item

__Block__

- album-list-item

__Elements__

- album-list-item__image
- album-list-item__title
- album-list-item__artist

### Album Detail

__Block__

- album-detail

__Elements__

- album-detail__image
- album-detail__title
- album-detail__artist
- album-detail__year
- album-detail__number-songs
- album-detail__tracks

### Track List Item

__Block__

- track-list-item

__Elements__

- track-list-item__title
- track-list-item__play-icon
- track-list-item__play-time

### Player

__Block__

- player