import { useState } from 'react';

export default ({ data, vote, errors }) => {
	const [ voterId, setVoterId ] = useState('');
	const [ voterSecret, setVoterSecret ] = useState('');
	const [ cIndex, setCIndex ] = useState(-1);
	return (
		<div className='container'>
			<h1>
				Vote Now for <span style={{ color: 'var(--button-color)' }}>{data.display_name}</span>
			</h1>
			<label htmlFor='voter-id'>Voter ID</label>
			<input
				onKeyPress={(e) => (e.charCode === 13 ? vote() : null)}
				onChange={(e) => setVoterId(e.target.value)}
				type='text'
				id='voter-id'
				placeholder='Your Voter ID'
			/>
			<span />
			<label htmlFor='voter-secret'>Voter Secret</label>
			<input
				onKeyPress={(e) => (e.charCode === 13 ? vote() : null)}
				onChange={(e) => setVoterSecret(e.target.value)}
				type='text'
				id='voter-secret'
				placeholder='Your Secret Key'
			/>
			<span />
			<label htmlFor='candidate-list'>Candidates</label>
			<ul id='candidate-list'>
				{data.candidates.map((candidate, index) => (
					<li key={`candidate-${index}`}>
						<input
							onChange={(e) => setCIndex(e.target.value)}
							type='radio'
							id={`${index}-option`}
							name='selector'
							value={index}
						/>
						<label htmlFor={`${index}-option`}>{candidate.name}</label>
						<div className='check'>{index === 0 ? <div className='inside' /> : null}</div>
					</li>
				))}
			</ul>
			{errors ? <p className='error'>{errors}</p> : null}
			<button onClick={() => vote({ voterId, voterSecret, cIndex })}>VOTE</button>
			<style jsx>{`
				ul {
					list-style: none;
					margin: 0;
					padding: 0;
					overflow: auto;
					margin-top: 20px;
				}

				ul li {
					color: #aaaaaa;
					display: block;
					position: relative;
					float: left;
					width: 100%;
					height: 75px;
					border-bottom: 1px solid #333;
				}

				ul li input[type=radio] {
					position: absolute;
					visibility: hidden;
				}

				ul li label {
					display: block;
					position: relative;
					font-weight: 300;
					font-size: 1.35em;
					padding: 12px 25px 12px 80px;
					margin: 10px auto;
					height: 30px;
					z-index: 9;
					cursor: pointer;
					-webkit-transition: all 0.2s linear;
				}

				ul li:hover label {
					color: var(--button-color);
				}

				ul li .check {
					display: block;
					position: absolute;
					border: 5px solid var(--highlight-color);
					border-radius: 100%;
					height: 25px;
					width: 25px;
					top: 18px;
					left: 20px;
					z-index: 5;
					transition: border .2s linear;
					-webkit-transition: border .2s linear;
				}

				ul li:hover .check {
					border: 5px solid var(--button-color);
				}

				ul li .check::before {
					display: block;
					position: absolute;
					content: '';
					border-radius: 100%;
					height: 15px;
					width: 15px;
					top: 5px;
					left: 5px;
					margin: auto;
					transition: background 0.2s linear;
					-webkit-transition: background 0.2s linear;
				}

				input[type=radio]:checked ~ .check {
					border: 5px solid var(--button-color);
				}

				input[type=radio]:checked ~ .check::before {
					background: var(--button-color);
				}

				input[type=radio]:checked ~ label {
					color: var(--button-color);
				}
			`}</style>
		</div>
	);
};