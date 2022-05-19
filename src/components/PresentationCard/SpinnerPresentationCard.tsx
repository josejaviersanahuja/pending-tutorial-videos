import SpinnerAvatar from '../Avatar/SpinnerAvatar'

export default function SpinnerPresentationCard() {
	return (
		<div className='presentation__card'>
			<SpinnerAvatar />
			<p className='presentation__card__name spinner'>.</p>
			<p className='presentation__card__email spinner'>.</p>
		</div>
	)
}