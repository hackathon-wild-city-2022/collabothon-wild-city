import React, { useContext, useEffect, useState } from 'react';
import {
    ImageBackground,
    View,
    Text,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Modal,
    Animated,
    StyleSheet,
    Button,
    Image
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CorrectAnswerContext, CurrentAnimalContext, DeviceIdContext } from '../App';
import { fetchQuestion } from '../hooks/state';

//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();

const QuizData = [
    {
        question: 'What’s the biggest planet in our solar system?',
        options: ['Jupiter', 'Saturn', 'Neptune', 'Mercury'],
        correct_option: 'Jupiter'
    }
];

export default function PlayQuiz({ navigation }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showScoreModal, setShowScoreModal] = useState(false);
    const answer: any = useContext(CorrectAnswerContext);

    const { currentAnimal } = useContext(CurrentAnimalContext);
    const { deviceIdContext, setDeviceIdContext } = useContext(DeviceIdContext);
    const [allQuestions, setAllQuestions] = useState<any>([]);

    useEffect(() => {
        (async () => {
            const data = await fetchQuestion("asdf", currentAnimal.id);
            const mapped = [{
                question: data.content,
                options: data.answers.map((ans: any) => (ans.content)),
                correct_option: data.answers.filter((a) => (a.is_correct)).map((ans: any) => (ans.content))[0],
            }];
            setAllQuestions(mapped);
        })();
    }, [deviceIdContext]);

    const validateAnswer = (selectedOption) => {
        let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsOptionsDisabled(true);
        answer.setCorrectAnswer(false);
        if (selectedOption == correct_option) {
            // Set Score
            setScore(score + 1);
            answer.setCorrectAnswer(true);
        } else answer.setCorrectAnswer(false);

        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionsDisabled(false);

        navigation.navigate('ResultScreen');
        // Show Next Button
        //setShowNextButton(true);
    };

    const handleNext = () => {
        if (currentQuestionIndex == allQuestions.length - 1) {
            // Last Question
            // Show Score Modal
            setShowScoreModal(true);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setIsOptionsDisabled(false);
            setShowNextButton(false);
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex + 1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    };

    const restartQuiz = () => {
        setShowScoreModal(false);

        setCurrentQuestionIndex(0);
        setScore(0);

        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionsDisabled(false);
        setShowNextButton(false);
        Animated.timing(progress, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start();
    };

    const renderQuestion = () => {
        return (
            <View
                style={{
                    marginVertical: 20
                }}>
                {/* Question Counter */}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end'
                    }}>
                </View>

                {/* Question */}
                <Text
                    style={{
                        color: COLORS.white,
                        alignItems: 'center',
                        fontSize: 25
                    }}>
                    {allQuestions[currentQuestionIndex]?.question}
                </Text>
            </View>
        );
    };

    const renderOptions = () => {
        return (
            <View style={{ paddingBottom: 30 }}>
                {allQuestions[currentQuestionIndex]?.options.map((option) => (
                    <TouchableOpacity
                        onPress={() => validateAnswer(option)}
                        disabled={isOptionsDisabled}
                        key={option}
                        style={{
                            borderWidth: 3,
                            borderColor:
                                option == correctOption
                                    ? COLORS.error
                                    : option == currentOptionSelected
                                        ? COLORS.error
                                        : COLORS.white,
                            backgroundColor:
                                option == correctOption
                                    ? COLORS.error
                                    : option == currentOptionSelected
                                        ? COLORS.error
                                        : COLORS.white,
                            height: 60,
                            borderRadius: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 20,
                            marginVertical: 10
                        }}>
                        <Text style={{ fontSize: 20, color: COLORS.black, alignItems: 'center', justifyContent: 'center' }}>{option}</Text>

                        {/* Show Check Or Cross Icon based on correct answer*/}
                        {/* {option == correctOption ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: COLORS.success,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <MaterialCommunityIcons name="check" style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }} />
              </View>
            ) : option == currentOptionSelected ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: COLORS.error,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <MaterialCommunityIcons name="close" style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }} />
              </View>
            ) : null} */}
                    </TouchableOpacity>
                ))}
            </View>
        );
    };
    const renderNextButton = () => {
        if (showNextButton) {
            return (
                <TouchableOpacity
                    onPress={() => navigation.navigate('ResultScreen')}
                    style={{
                        marginTop: 20,
                        width: '100%',
                        backgroundColor: COLORS.accent,
                        padding: 20,
                        borderRadius: 5
                    }}>
                    <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}>Next</Text>
                </TouchableOpacity>
            );
        } else {
            return null;
        }
    };

    const [progress, setProgress] = useState(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, allQuestions.length],
        outputRange: ['0%', '100%']
    });
    // const renderProgressBar = () => {
    //     return (
    //         <View style={{
    //             width: '100%',
    //             height: 20,
    //             borderRadius: 20,
    //             backgroundColor: '#00000020',

    //         }}>
    //             <Animated.View style={[{
    //                 height: 20,
    //                 borderRadius: 20,
    //                 backgroundColor: COLORS.accent
    //             }, {
    //                 width: progressAnim
    //             }]}>

    //             </Animated.View>

    //         </View>
    //     )
    // }

    return (
        <SafeAreaView
            style={{
                flex: 1
            }}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../assets/images/QuestionsBackgroundImage.jpg')}
                    resizeMode="cover"
                    style={styles.image}
                >
                    <View
                        style={{
                            backgroundColor: COLORS.background,
                            borderRadius: 30,
                            paddingRight: 15,
                            paddingLeft: 15
                        }}>


                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            paddingTop: 15
                        }}>

                            <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('Camera')}>
                                <Image source={require("../assets/images/arrow_left.png")} width={10} height={20} style={{ width: 10, height: 20, margin: 10 }}></Image>
                            </TouchableOpacity>

                            <View style={{ flex: 10 }}>
                                <Text style={{ alignItems: 'flex-end', textAlign: "center", justifyContent: 'center', color: COLORS.white, fontSize: 14 }}>
                                    You catch an {currentAnimal.name}!
                                </Text>
                                <Text style={{ alignItems: 'flex-end', textAlign: "center", justifyContent: 'center', color: COLORS.white, fontSize: 14 }}>
                                    Answer a question and add to collection
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}></View>
                        </View>


                        {/* Question */}
                        {renderQuestion()}

                        {/* Options */}
                        {renderOptions()}
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
}

const COLORS = {
    primary: '#252c4a',
    secondary: '#1E90FF',
    accent: '#3498db',

    success: '#00C851',
    error: '#F67D71',

    black: '#171717',
    white: '#FFFFFF',
    background: '#24A993'
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 70
    },
    text: {
        color: 'white',
        fontSize: 42,
        lineHeight: 84,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000c0'
    }
});
