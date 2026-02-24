export function Feedback({ feedback }) {
    return <p className={`text-center text-white text-sm py-2 ${feedback.level === 'success' ? 'bg-green-700' : feedback.level === 'error' ? 'bg-red-600' : ''}`}>{feedback.message}</p>
}