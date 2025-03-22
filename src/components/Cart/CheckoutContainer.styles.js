const styles = {
  pageContainer: {
    padding: '20px',
    maxWidth: '600px',
    margin: 'auto',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  totalContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '18px',
    marginBottom: '20px',
  },
  totalAmount: {
    fontSize: '24px',
  },
  checkoutButton: {
    width: '100%',
    marginBottom: '15px'
  },
  itemActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTotal: {
    fontWeight: 'bold',
  },
  // Desktop style for horizontal layout
  itemLayoutHorizontal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // Mobile style for vertical layout (using media queries)
  itemLayoutMobile: {
    display: 'block',
  },
};
export default styles