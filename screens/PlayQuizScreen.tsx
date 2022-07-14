import React, { useContext, useState } from 'react';
import {
    ImageBackground,
    View,
    Text,
    SafeAreaView,
    StatusBar,
    Image,
    TouchableOpacity,
    Modal,
    Animated,
    StyleSheet,
    Button
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResultScreen from './ResultScreen';
import Navigation from '../navigation';
import { CorrectAnswerContext, CurrentAnimalContext } from '../App';
import Colors from '../constants/Colors';

//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();

const QuizData = [
    {
        question: 'What’s the biggest planet in our solar system?',
        options: ['Jupiter', 'Saturn', 'Neptune', 'Mercury'],
        correct_option: 'Jupiter'
    }
    // {
    //     question: "What attraction in India is one of the famus in the world?",
    //     options: ["Chand Minar", "Taj Mahal", "Stadium"],
    //     correct_option: "Taj Mahal"
    // },
    // {
    //     question: "What land animal can open its mouth the widest?",
    //     options: ["Alligator", "Crocodile", "Baboon", "Hippo"],
    //     correct_option: "Hippo"
    // },
    // {
    //     question: "What is the largest animal on Earth?",
    //     options: ["The African elephant", "The blue whale", "The sperm whale", "The giant squid"],
    //     correct_option: "The blue whale"
    // },
    // {
    //     question: "What is the only flying mammal?",
    //     options: ["The bat", "The flying squirrel", "The bald eagle", "The colugo"],
    //     correct_option: "The bat"
    // }
];

export default function PlayQuiz({ navigation }) {
    const allQuestions = QuizData;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showScoreModal, setShowScoreModal] = useState(false);
    const answer: any = useContext(CorrectAnswerContext);

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
            <View>
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
                            <Button
                                onPress={() => navigation.navigate('Camera')}
                                title="<"
                                color={COLORS.white}
                                accessibilityLabel="Learn more about this purple button" />

                            <Text style={{ alignItems: 'flex-end', justifyContent: 'center', color: COLORS.white, fontSize: 20 }}>
                                You catch an Indian Elephant!
                                Answer a question and add to collection
                            </Text>
                        </View>


                        {/* Question */}
                        {renderQuestion()}

                        {/* Options */}
                        {renderOptions()}

                        {/* Next Button */}
                        {renderNextButton()}

                        {/* Score Modal */}
                        <Modal animationType="slide" transparent={true} visible={showScoreModal}>
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: COLORS.background,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                <View
                                    style={{
                                        backgroundColor: COLORS.white,
                                        width: '90%',
                                        borderRadius: 20,
                                        padding: 20,
                                        alignItems: 'center'
                                    }}>
                                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
                                        {score > allQuestions.length / 2 ? 'Congratulations!' : 'Oops!'}
                                    </Text>

                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            marginVertical: 20
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 30,
                                                color: score > allQuestions.length / 2 ? COLORS.success : COLORS.error
                                            }}>
                                            {score}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 20,
                                                color: COLORS.black
                                            }}>
                                            / {allQuestions.length}
                                        </Text>
                                    </View>
                                    {/* Retry Quiz button */}
                                    <TouchableOpacity
                                        onPress={restartQuiz}
                                        style={{
                                            backgroundColor: COLORS.accent,
                                            padding: 20,
                                            width: '100%',
                                            borderRadius: 20
                                        }}>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                color: COLORS.white,
                                                fontSize: 20
                                            }}>
                                            Retry Quiz
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
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

const SIZES = {
    base: 10,
    width: 50,
    height: 50
};
