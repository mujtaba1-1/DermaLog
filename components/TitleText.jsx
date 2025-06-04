import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TitleText = ({style, ...props}) => {
  return (
    <Text 
      style={[styles.title, style]}
      {...props}
    />
  )
}

export default TitleText

const styles = StyleSheet.create({
    title: {
        fontWeight: '500',
        fontSize: 18,
        letterSpacing: 0.5,
        color: '#111827',
        marginVertical: 8
    }
})