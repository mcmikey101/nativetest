import { Button, Text, View, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

interface BtnProp {
  status: boolean,
  btnHandle(): void
}

const styles = StyleSheet.create({
  btnstyle: {
    width: 300,
    height: 80,
    backgroundColor: 'blue',
    textAlign: 'center',
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  pressabletext: {
    color: 'white',
    fontSize: 30
  },

})

function BtnSwitch(props: BtnProp) {
  const [longcolor, setLongColor] = useState('blue')
  function longpress() {
    setLongColor('green')
    console.log('long press', styles.btnstyle.backgroundColor)
  }
  function blur() {
    setLongColor('blue')
    console.log('blurred')
  }
  if (props.status) {
    return <Pressable style={[styles.btnstyle, {backgroundColor: longcolor}]} onPressOut={() => blur()} onPress={props.btnHandle} onLongPress={() => setLongColor('green')}>
      <Text style={styles.pressabletext}>Pressable text</Text>
    </Pressable>
  }
  else {
    return <Button title="Switch 2" color={'red'} onPress={props.btnHandle}/>
  }
}

export default function Index() {
  const [btnstate, setBtnstate] = useState(true)
  const [blockHeight, setBlockHeight] = useState(0)
  const [timingLen, setTimingLen] = useState(0.001)

  function btnpress() {
    setBtnstate(!btnstate)
  }
  function toggleBlock() {
    setTimingLen(0.001)
    if (blockHeight == 0) {
      for (let i = 0; i < 400; i += 40) {
        setTimeout(() => {
          setBlockHeight(i)
          setTimingLen(timingLen + 0.001)
        }, timingLen)
      }
    } else {
      for (let i = 400; i > -40; i -= 40) {
        setTimeout(() => {
          setBlockHeight(i)
          setTimingLen(timingLen + 0.001)
        }, timingLen)
      }
    }
  }
  return (
    <>
    <View style={{overflow: 'hidden', 
    backgroundColor: 'black', 
    width: blockHeight, 
    height: 200, 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute'
    }}>
      <Text style={{color: 'white'}}>Hidden Text!</Text>
    </View>
    <Button title="Toggle" onPress={toggleBlock}></Button>
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{
        fontSize: 80
      }}>Test</Text>
      <Text>Smaller test</Text>
      <BtnSwitch status={btnstate} btnHandle={btnpress}/>
    </View>
    </>
  );
}