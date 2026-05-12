import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw, Brain, Trophy } from 'lucide-react';
import { quizQuestions } from '@/lib/data';
import { Button } from '@/components/ui/button';

type QuizState = 'start' | 'playing' | 'results';

export default function Quiz() {
  const [gameState, setGameState] = useState<QuizState>('start');
  const [questions, setQuestions] = useState<typeof quizQuestions>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Initialize a random set of 10 questions
  const startQuiz = () => {
    const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 10));
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(index);
    setIsAnswered(true);

    const isCorrect = index === questions[currentQuestionIndex].correct;
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        setGameState('results');
      }
    }, 1500); // Wait 1.5s to show feedback before moving on
  };

  const getGrade = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return { text: "Commander", color: "text-amber-400" };
    if (percentage >= 80) return { text: "Astronaut", color: "text-blue-400" };
    if (percentage >= 60) return { text: "Cadet", color: "text-green-400" };
    return { text: "Trainee", color: "text-foreground/60" };
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 relative">
      <div className="max-w-3xl w-full mx-auto relative z-10">
        <AnimatePresence mode="wait">
          
          {/* Start Screen */}
          {gameState === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
              className="text-center glass-panel p-12 rounded-3xl border border-white/10"
            >
              <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                <Brain className="w-10 h-10 text-amber-400" />
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-glow">
                COSMIC KNOWLEDGE
              </h1>
              <p className="text-foreground/70 mb-8 max-w-lg mx-auto leading-relaxed">
                Test your understanding of the universe. You will face 10 random questions. Choose wisely, space is unforgiving.
              </p>
              <Button 
                size="lg" 
                onClick={startQuiz}
                className="rounded-full px-12 h-14 bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] font-heading tracking-widest text-lg transition-all"
              >
                INITIATE SEQUENCE
              </Button>
            </motion.div>
          )}

          {/* Playing Screen */}
          {gameState === 'playing' && questions.length > 0 && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full"
            >
              <div className="flex justify-between items-center mb-8 font-mono text-sm tracking-widest">
                <div className="text-foreground/60">
                  QUESTION <span className="text-white text-lg font-bold">{currentQuestionIndex + 1}</span> / {questions.length}
                </div>
                <div className="text-foreground/60">
                  SCORE <span className="text-amber-400 text-lg font-bold">{score}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1 bg-white/5 rounded-full mb-12 overflow-hidden">
                <motion.div 
                  className="h-full bg-amber-500"
                  initial={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}
                  animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 mb-8 min-h-[200px] flex items-center justify-center text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />
                <h2 className="text-2xl md:text-3xl font-medium leading-relaxed z-10">
                  {questions[currentQuestionIndex].q}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[currentQuestionIndex].a.map((answer, index) => {
                  const isCorrectAnswer = index === questions[currentQuestionIndex].correct;
                  const isSelected = selectedAnswer === index;
                  
                  let buttonClass = "bg-black/40 border-white/10 hover:border-amber-500/50 hover:bg-white/5";
                  
                  if (isAnswered) {
                    if (isCorrectAnswer) {
                      buttonClass = "bg-green-500/20 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)] text-green-50";
                    } else if (isSelected) {
                      buttonClass = "bg-red-500/20 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)] text-red-50";
                    } else {
                      buttonClass = "bg-black/20 border-white/5 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={isAnswered}
                      className={`relative p-6 rounded-2xl border text-left transition-all duration-300 group overflow-hidden ${buttonClass}`}
                    >
                      <div className="flex items-center justify-between relative z-10">
                        <span className="font-medium text-lg">{answer}</span>
                        {isAnswered && isCorrectAnswer && <CheckCircle2 className="w-6 h-6 text-green-400" />}
                        {isAnswered && isSelected && !isCorrectAnswer && <XCircle className="w-6 h-6 text-red-400" />}
                      </div>
                      
                      {!isAnswered && (
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Results Screen */}
          {gameState === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center glass-panel p-12 rounded-3xl border border-white/10 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.1)_0%,transparent_70%)] pointer-events-none" />
              
              <Trophy className="w-20 h-20 text-amber-400 mx-auto mb-6" />
              
              <h2 className="font-heading text-3xl font-bold mb-2 uppercase tracking-widest text-foreground/50">
                Mission Complete
              </h2>
              
              <div className="flex items-end justify-center gap-2 mb-4">
                <span className="text-7xl font-bold text-white leading-none">{score}</span>
                <span className="text-3xl text-foreground/50 leading-none mb-1">/ {questions.length}</span>
              </div>
              
              <div className="mb-10">
                <span className="text-sm font-mono tracking-widest text-foreground/50 uppercase">Rank Achieved</span>
                <div className={`font-heading text-3xl font-bold mt-2 ${getGrade().color}`}>
                  {getGrade().text}
                </div>
              </div>
              
              <Button 
                size="lg" 
                onClick={startQuiz}
                className="rounded-full px-10 h-14 bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-all font-heading tracking-widest"
              >
                <RotateCcw className="w-5 h-5 mr-3" />
                PLAY AGAIN
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
