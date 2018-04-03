## Simple TimePicker React
<img src="https://media.giphy.com/media/cYeguBQTvMCssrn1G1/giphy.gif" alt="demo">

## Usage
`npm i simple-timepicker-react`

```
import SimpleTimePickerReact from 'simple-timepicker-react'

...
render() {
   return <SimpleTimePickerReact onChange={time => console.log(time} />
}
...

```

Options
----
|  prop |   type | default value |
| ------------- | ------------- | ------------- |
| width  | Number  | 200  |
| fluidWidth  | Boolean  | false  |
| placeholderText  | String  | --:--  |
| hourInterval  | Number  | 1  |
| minuteInterval  | Number  | 1  |
| visiblePicker | Boolean | false |
| onChange  | Func  |   |
| value | String | null
| disabled | Boolean | false