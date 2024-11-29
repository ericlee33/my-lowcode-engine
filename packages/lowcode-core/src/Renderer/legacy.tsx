import React from 'react';
import styled from 'styled-components';
import ComponentWrapper from './ComponentWrapper';
import ScopedContextProvider from '../Editor/store/ScopedContext';
import EngineCore from '../core/model/EngineCore';

interface IRendererProps {
	className?: string;
	style?: React.CSSProperties;
	schema: EngineCore;
}

const Root = styled.div`
	.material-item-container {
	}
`;

const Renderer: React.FC<IRendererProps> = ({ className, style, schema }) => {
	return (
		<Root
			className={className}
			style={style}
		>
			{/* <ScopedContextProvider> */}
			{schema.map((item) => {
				return (
					<ComponentWrapper
						key={item.id}
						item={item}
					/>
				);
			})}
			{/* </ScopedContextProvider> */}
		</Root>
	);
};

export default Renderer;
