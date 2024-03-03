import * as React from "react"
import Svg, { Rect, Defs, Pattern, Use, Image } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={30}
      height={20}
      viewBox="0 0 30 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <Rect
        x={0.5}
        y={0.5}
        width={29}
        height={19}
        rx={3.5}
        fill="url(#pattern0)"
        stroke="#000"
      />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use
            xlinkHref="#image0_59_3"
            transform="matrix(.01667 0 0 .025 -.133 0)"
          />
        </Pattern>
        <Image
          id="image0_59_3"
          width={76}
          height={40}
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAAAoCAIAAADbkIswAAADB0lEQVRoBe1asYrbQBDVt6RNm263kAqpkEghVXYKF8EmpFkjggq5EASDOYghCLkK7qRrVahVYVcixQZc2VFndy4Catxf7pgwbJSQBI4NAz6zhZ9XXuZp5r0ZCxucCU1r/tyrnr2gsAzOROAnWVoOB3Ng24OeG2dpORrdwG4POnaUpeVkvIRdywwR0iLp2NHxeA78BAM97E/ImTMhZYs0OBPbzW4qVnAxZ6Kqmlm8VuFiccuZoEXSMkPOhGWGnhtPxkuEjh0BGcsMYQEZeM+Z+DOsquaOxuuhXHFVVSNli7DI68P+BJw5E1laHo9nhIvFbdddHDuC62fxuusunhvj18mRBMlhih4PoYxpJPLuIZPDwbzrLqi6wE+67oKqA4iq89z4eDyD6jgTjh0d9qcsLSGBlhlK2RZ5zZn4+PJt8+oNhfVA0rGjwE+g0jw3tsxQhWC/uAsQXAo+DPzkt5CW8aCKiryuqgZhlpbbzU4VoZQtwlm8PuxPqMmpWB32J1WT5EhCcMPBHIr2X+B9GUNJYz5VCEb17fMXCuvHMCBli40x8BMpW7X7q33SsSMpW1SsZYbbzQ4Va5lhVTWgWFru6thRkdeQEKjGIq9BZgBxHkKI9gsZg/zD7n1rgVtAi6QqwiKvIVbOxGJxW1UNwlm83m52qgi3mx3cGs7EVKxUSM5dYdyBCQYqDYhNxaoHoVXA7mS8VOFwMIfOgTeFlvEEfoL1yZnw3LjIa5RoD0Jto2ItMyzyGnssQChXWiQ9N5ayVQd01XjAWpDGXwf0Iq8h//m7D1/TTxTWT7Mr1CfWGxRkD6ImR6ObLC1Rkz1IbqzrGQ9CMB6Es3itjgrgNLg7GS/V4Z4iSWwJkLfHQ84ErXLVNKDTMh51QId2ggM6VOOvEF1KndfxYtglRHL++r2mRahcifyu1RqGofV0IocbFJq17hgMCg9/dcdwHSQpPGjSHcN1GA8RA9QahkHhQZPuGK7DeHTbN4XzDd3ORuH8J3fVann/8fDryCQFY9Adw1MLofEHlcfn+TtaISOZ70iQTwAAAABJRU5ErkJggg=="
        />
      </Defs>
    </Svg>
  )
}

export default SvgComponent
