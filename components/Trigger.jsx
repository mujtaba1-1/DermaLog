import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Trigger = ({trigger}) => {
  return (
    <Text style={styles.trigger}>{trigger}</Text>
  )
}

export default Trigger

const styles = StyleSheet.create({
    trigger: {
        backgroundColor: '#F0F0F0',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
    }
})