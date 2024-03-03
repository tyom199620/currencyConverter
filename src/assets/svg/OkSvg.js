import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={'35'}
      height={'35'}
      xmlns="http://www.w3.org/2000/svg"
      fill="green"
      id="Layer_1"
      viewBox="0 0 24 24"
      xmlSpace="preserve"
      {...props}
    >
      <Path d="M19.3 5.3L9 15.6l-4.3-4.3-1.4 1.4 5 5 .7.7.7-.7 11-11-1.4-1.4z" />
      <Path d="M0 0H24V24H0z" fill="none" />
    </Svg>
  )
}

export default SvgComponent
