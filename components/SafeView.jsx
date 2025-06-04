import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SafeView = ({style, safe=false, ...props}) => {
  
  const insets = useSafeAreaInsets();

  if (!safe) return <View style={style} {...props} />;

  return (
    <View
      style={[
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        style,
      ]}
      {...props}
    />
  );
}

export default SafeView