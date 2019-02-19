## Navigation

### Introduction: 

I am using React Navigation which is a powerful navigation plug in that does most of the hard work of managing navigation states. You can learn more about React Navigation here: https://reactnavigation.org/docs/en/getting-started.html And the documentation of the props API here: https://reactnavigation.org/docs/en/navigation-prop.html.

RootNavigator is a switchNavigator that divides the app into non authorized portion (ie: login screen, splash screenm, modal screen etc) and into authorized portion (if we needed in the future).

In the authorized portion, there is also a stack navigator.  This navigator is known as the AppStackNavigator.
