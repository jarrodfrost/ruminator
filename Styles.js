export default styles = StyleSheet.create({
	scroll: {
		flex: 1,
		backgroundColor: '#fff',
		width: '100%',
	},
  container: {
    flex: 1.0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  smallContainer: {
  	flex: 0.3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  counterbox: {
  	flex: 0.3,
  	backgroundColor: 'red',
  	alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
  },
  input: {
    margin: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    flex: 0.5,
  },
  settingsInput: {
  	margin: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
    flex: 0.1,
  },
  text: {
  	fontSize: 20,
  	textAlign: 'center',
  },
  textBold: {
  	fontSize: 24,
  	textAlign: 'justify',
  	fontWeight: 'bold',
  },
  textBoldBold: {
  	fontSize: 36,
  	textAlign: 'justify',
  	fontWeight: 'bold',
  	adjustsFontSizeToFit: true,
  },
  button: {
  	fontSize: 25,
  	textAlign: 'center',
  	display: 'flex',
  	justifyContent: 'center',
  },
  outerButton: {
  	display: 'flex',
  	flex: 0.4,
  	alignItems: 'center',
  	justifyContent: 'center',
  	backgroundColor: 'lightgrey',
  	borderRadius: 10,
  	padding: 10,
  	borderWidth: 1,
  	margin: 10,
  },
});

