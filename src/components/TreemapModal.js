import * as d3 from 'd3';
import { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';


const renderTreemap = (data) => {
  const width = 700;
  const height = 500;
  const padding = 4;

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const formatMillions = value => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    return `$${(value / 1e6).toFixed(1)}M`;
  };
  
  const root = d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value);
  
  d3.treemap()
    .size([width, height])
    .padding(padding)(root);
  
  const svg = d3.select('#treemap')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");
  
  const nodes = svg.selectAll('g')
    .data(root.leaves())
    .enter()
    .append('g')
    .attr('transform', d => `translate(${d.x0},${d.y0})`);
  
  nodes.append('rect')
    .attr('width', d => d.x1 - d.x0)
    .attr('height', d => d.y1 - d.y0)
    .style('fill', d => color(d.data.name));
  
  nodes.append('text')
    .attr('x', d => (d.x1 - d.x0) / 2)
    .attr('y', d => (d.y1 - d.y0) / 2 - 10) // Position name text slightly higher
    .attr('dy', '.35em')
    .attr('text-anchor', 'middle')
    .text(d => {
      const textWidth = d.x1 - d.x0;
      const truncatedName = d.data.name.length > textWidth / 10 ? `${d.data.name.substring(0, textWidth / 10)}...` : d.data.name;
      return truncatedName;
    })
    .style('fill', 'white')
    .style('font-size', '12px');
  
  nodes.append('text')
    .attr('x', d => (d.x1 - d.x0) / 2)
    .attr('y', d => (d.y1 - d.y0) / 2 + 10) // Position value text slightly lower
    .attr('dy', '.35em')
    .attr('text-anchor', 'middle')
    .text(d => formatMillions(d.data.value))
    .style('fill', 'white')
    .style('font-size', '12px');
  
};

const TreemapModal = ({ show, handleClose, data }) => {
  useEffect(() => {
    if (show) {
      renderTreemap(data);
    }
  }, [show, data]);

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Funding Treemap</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div id="treemap"></div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TreemapModal;