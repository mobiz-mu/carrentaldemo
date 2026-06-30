# Mobiz Car Rental — Stock Image Replacement Guide

All car images live in `public/images/cars/`. Each file is currently a clean,
branded **placeholder** (gradient + car name + Mobiz plate) so nothing ever
appears broken. Replace any file below with a real photo using the **same file
name** and the website will pick it up automatically — no code changes needed.

Recommended size: landscape, ~1200×800px (3:2), JPG, optimized/compressed.
If an image is missing or fails to load, the app automatically falls back to a
gradient placeholder, so the layout never breaks.

| # | Car | Current file | Recommended real stock image |
|---|-----|--------------|------------------------------|
| 1 | Toyota Aqua | `/images/cars/toyota-aqua.jpg` | White/silver Toyota Aqua, front 3/4 view |
| 2 | Suzuki Swift | `/images/cars/suzuki-swift.jpg` | Red or white Suzuki Swift, front-side angle |
| 3 | Nissan Note | `/images/cars/nissan-note.jpg` | Silver/blue Nissan Note hatchback, front 3/4 |
| 4 | Toyota Axio | `/images/cars/toyota-axio.jpg` | White Toyota Axio/Corolla sedan, side-front |
| 5 | Honda Vezel | `/images/cars/honda-vezel.jpg` | White/grey Honda Vezel (HR-V) compact SUV, 3/4 |
| 6 | Nissan Qashqai | `/images/cars/nissan-qashqai.jpg` | Grey Nissan Qashqai SUV, front 3/4 |
| 7 | Toyota Noah | `/images/cars/toyota-noah.jpg` | White Toyota Noah MPV/van, front-side |
| 8 | Kia Carnival | `/images/cars/kia-carnival.jpg` | Black/grey Kia Carnival people-mover, 3/4 |
| 9 | BMW 3 Series | `/images/cars/bmw-3-series.jpg` | Blue/black BMW 3 Series sedan, dynamic 3/4 |
| 10 | Mercedes-Benz C-Class | `/images/cars/mercedes-benz-c-class.jpg` | Silver/white Mercedes C-Class sedan, front 3/4 |
| 11 | Hyundai H1 | `/images/cars/hyundai-h1.jpg` | White Hyundai H1/Starex passenger van, side-front |
| 12 | Toyota Hiace | `/images/cars/toyota-hiace.jpg` | White Toyota Hiace minibus, front-side |

> Note: the spec's example list used `mercedes-c-class.jpg`; this project uses
> `mercedes-benz-c-class.jpg` to match the car's slug/detail URL. If you prefer
> the shorter name, rename both the image file and the car's `slug` in
> `lib/cars.ts` together.

## How images are wired
Each car in `lib/cars.ts` automatically gets `imageUrl = /images/cars/<slug>.jpg`.
To use a remote/CDN image instead, set an explicit `imageUrl` on that car object.
