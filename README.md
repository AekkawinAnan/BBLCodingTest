# คู่มือรันแอป

ก่อนรันแอป ให้เข้าไปในโฟลเดอร์ MyApp ก่อนเสมอ:

```sh
cd MyApp
```

## เริ่ม Metro

```sh
npm start
```

## รันแอปบน iOS

ถ้ากำลังรันบน iOS Simulator แนะนำให้ติดตั้ง CocoaPods ก่อนโดยรัน:

```sh
npx pod-install
```

จากนั้นรัน:

```sh
npm run ios
```

## รันแอปบน Android

```sh
npm run android
```

หากต้องการรันบน iOS ครั้งแรก อาจต้องติดตั้ง CocoaPods ก่อน:

```sh
bundle install
bundle exec pod install
```
