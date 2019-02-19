## Code Structure and Folder Architecture

Filename of any component or container should be in pascalcase, including the containing folders.

###Code Structure

If it is a stateless component, there should be absolutely no logic in the component and instead the logic should be in the parent component.

For importing functions and files. The imports relating to React Native, react, react-native, and prop-types should go first, followed by a line break. The next section should be the npm packages in the order they are used in the code. Again there should be another line break, followed by the components section and followed by the last line break. The last section is static content.

```javascript
import React, { SFC } from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import { NavigationScreenProp } from "react-navigation";

import { H2, Text } from "native-base";

import { Header } from "../../common/Header/Header";
import { Button } from "../../common/Button/Button";
import { nextIcon } from "../../static/imports/icons";
```

### src

#### components

All files in components should not have any business logic. Business logic should live in containers.

#### containers

Files should be inside either one of the big categories: Reservation, Add Reservation.
