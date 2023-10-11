import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from "react-native-reanimated";
import AnimatedTabBarView from "./components/AnimatedTabBarView";

export default function AnimatedStyleUpdateExample(props) {
	const randomWidth = useSharedValue(10);

	const config = {
		duration: 500,
		easing: Easing.bezier(0.5, 0.01, 0, 1),
	};

	const style = useAnimatedStyle(() => {
		return {
			width: withTiming(randomWidth.value, config),
		};
	});

	return <AnimatedTabBarView />;
}
