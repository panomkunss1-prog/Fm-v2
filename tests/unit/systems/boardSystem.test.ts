import { describe, it, expect } from 'vitest';
import { classifyBoardConfidence, getBoardConfidenceSnapshot } from '@systems/boardSystem';

describe('boardSystem.classifyBoardConfidence', () => {
  it('classifies 0 as critical', () => {
    expect(classifyBoardConfidence(0)).toBe('critical');
  });

  it('classifies just below the under_pressure boundary (39) as critical', () => {
    expect(classifyBoardConfidence(39)).toBe('critical');
  });

  it('classifies the under_pressure boundary (40) as under_pressure', () => {
    expect(classifyBoardConfidence(40)).toBe('under_pressure');
  });

  it('classifies just below the stable boundary (59) as under_pressure', () => {
    expect(classifyBoardConfidence(59)).toBe('under_pressure');
  });

  it('classifies the stable boundary (60) as stable', () => {
    expect(classifyBoardConfidence(60)).toBe('stable');
  });

  it('classifies just below the strong boundary (79) as stable', () => {
    expect(classifyBoardConfidence(79)).toBe('stable');
  });

  it('classifies the strong boundary (80) as strong', () => {
    expect(classifyBoardConfidence(80)).toBe('strong');
  });

  it('classifies 100 as strong', () => {
    expect(classifyBoardConfidence(100)).toBe('strong');
  });

  it('clamps a score above 100 to the strong classification', () => {
    expect(classifyBoardConfidence(150)).toBe('strong');
  });

  it('clamps a negative score to the critical classification', () => {
    expect(classifyBoardConfidence(-20)).toBe('critical');
  });
});

describe('boardSystem.getBoardConfidenceSnapshot', () => {
  it('returns the clamped score alongside its classification', () => {
    expect(getBoardConfidenceSnapshot({ score: 64 })).toEqual({
      score: 64,
      level: 'stable',
    });
  });

  it('clamps an out-of-range score in the returned snapshot itself', () => {
    expect(getBoardConfidenceSnapshot({ score: 250 })).toEqual({
      score: 100,
      level: 'strong',
    });
  });
});
