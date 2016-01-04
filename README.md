# react-animation

Inspired by react-motion

```
$ npm install react-animation
```

```js
import * as React from "react";
import Animation from "./Animation";

class MovingCircle extends React.Component<{}, {}> {
  render() {
    return (
      <Animation duration={1000} loop={true}>
        {progress =>
          <circle
            cx={progress * 100} cy={30}
            r={25}
            stroke="grey" strokeWidth={1}
            fill="wheat"
          />
        }
      </Animation>
    );
  }
}
```

## TODO

- documentation
- test
