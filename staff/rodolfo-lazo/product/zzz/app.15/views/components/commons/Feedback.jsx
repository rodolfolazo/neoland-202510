export function Feedback({ feedback }) {
    return <p className={feedback.level === 'success' ? 'text-green-700' : feedback.level === 'error' ? 'text-red-600' : ''}>{feedback.message}</p>
}