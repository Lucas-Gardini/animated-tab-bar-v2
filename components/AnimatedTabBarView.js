import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from "react-native-reanimated";

const config = {
	duration: 500,
	easing: Easing.bezier(0.5, 0.01, 0, 1),
};

function TopBar({ toggleTab }) {
	const progress = useSharedValue(0);

	const { width } = Dimensions.get("window");
	const maxLeft = width - width * 0.525; // Assuming 45% is the width of your button

	const tabActiveStyle = useAnimatedStyle(() => {
		return {
			left: `${progress.value * (100 - 50)}%`,
		};
	});

	return (
		<View
			style={{
				position: "relative",
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				width: "100%",
				backgroundColor: "#ddd",
				zIndex: 0,
			}}
		>
			<Animated.View style={[{ ...styles.tabButtons, backgroundColor: "red", position: "absolute", zIndex: 1 }, tabActiveStyle]} />

			<TouchableOpacity
				style={styles.tabButtons}
				onPress={() => {
					toggleTab(0);
					progress.value = withTiming(0, config);
				}}
			>
				<Text>Botão 1</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.tabButtons}
				onPress={() => {
					toggleTab(1);
					progress.value = withTiming(1, config);
				}}
			>
				<Text>Botão 2</Text>
			</TouchableOpacity>
		</View>
	);
}

export default function AnimatedTabBarView({ children }) {
	const progressScreenOne = useSharedValue(0);
	const progressScreenTwo = useSharedValue(100);

	const [currentTab, setCurrentTab] = useState(0);

	useEffect(() => {
		if (currentTab === 0) {
			progressScreenOne.value = withTiming(0, config);
			progressScreenTwo.value = withTiming(100, config);
		} else {
			progressScreenOne.value = withTiming(100, config);
			progressScreenTwo.value = withTiming(0, config);
		}
	}, [currentTab]);

	const screenOne = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: -progressScreenOne.value * 100 }],
			display: currentTab === 0 ? "flex" : "none",
		};
	});

	const screenTwo = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: -progressScreenTwo.value * 100 }],
			display: currentTab === 1 ? "flex" : "none",
		};
	});

	return (
		<View style={{ flex: 1, paddingLeft: 25, paddingRight: 25, paddingTop: 50 }}>
			{/* Substitua o componente TopBar pelo componente apropriado */}
			<TopBar toggleTab={(index) => setCurrentTab(index)} />

			<View style={[{ flexDirection: "row", width: "200%" }]}>
				<Animated.View style={[{ flex: 1 }, screenOne]}>
					<Text>Home</Text>
				</Animated.View>
				<Animated.View style={[{ flex: 1 }, screenTwo]}>
					<Text>Search</Text>
				</Animated.View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	tabButtons: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: 50,
		width: "50%",
		zIndex: 2,
	},
});
