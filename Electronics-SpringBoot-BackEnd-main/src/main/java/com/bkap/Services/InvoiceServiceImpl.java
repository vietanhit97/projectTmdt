package com.bkap.Services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import com.bkap.Filters.InvoiceFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.bkap.Entities.Invoice;
import com.bkap.Entities.InvoiceDetail;
import com.bkap.Repositories.InvoiceDetailRepos;
import com.bkap.Repositories.InvoiceRepos;

@Service
public class InvoiceServiceImpl implements InvoiceService {

	@Autowired
	private InvoiceRepos inRepos;
	@Autowired
	private InvoiceDetailRepos deRepos;
	@Override
	public List<Invoice> getAllInvoice() {
		// TODO Auto-generated method stub
		return inRepos.findAll();
	}

	@Override
	public List<Invoice> getInvoiceByDate(Date startDate, Date endDate) {
		// TODO Auto-generated method stub
		return inRepos.getByDate(startDate, endDate);
	}

	@Override
	public Invoice getById(int id) {
		// TODO Auto-generated method stub
		Integer _id = Integer.valueOf(id);
		return inRepos.getById(_id);
	}

	@Override
	public Invoice save(Invoice p) {
		// TODO Auto-generated method stub
		return inRepos.save(p);
	}

	@Override
	public void merge(Invoice p) {
		// TODO Auto-generated method stub
		inRepos.save(p);
	}

	@Override
	public void remove(Invoice p) {
		// TODO Auto-generated method stub
		inRepos.delete(p);
	}

	@Override
	public Page<Invoice> pagination(int pageNumber) {
		// TODO Auto-generated method stub
		return inRepos.findAll(PageRequest.of(pageNumber, 10, Sort.by("id").ascending()));
	}

	@Override
	public List<InvoiceDetail> getInvoiceDetails(int invoiceId) {
		// TODO Auto-generated method stub
		return deRepos.getByInvoiceId(invoiceId);
	}

	@Override
	public InvoiceDetail getInvoiceDetailById(int id) {
		// TODO Auto-generated method stub
		return deRepos.getById(id);
	}

	@Override
	public InvoiceDetail save(InvoiceDetail p) {
		// TODO Auto-generated method stub
		return deRepos.save(p);
	}

	@Override
	public void merge(InvoiceDetail p) {
		// TODO Auto-generated method stub
		deRepos.save(p);
	}

	@Override
	public void remove(InvoiceDetail p) {
		// TODO Auto-generated method stub
		deRepos.delete(p);
	}

	@Override
	@Transactional
	public void removeDetailByInvoice(int invoiceId) {
		// TODO Auto-generated method stub
		List<InvoiceDetail> ivd = deRepos.getByInvoiceId(invoiceId);
		for (InvoiceDetail invoiceDetail : ivd) {
			this.remove(invoiceDetail);
		}
		Invoice iv =  inRepos.getById(invoiceId);
		this.remove(iv);
	}

	@Override
	@Transactional
	public List<Invoice> filter(InvoiceFilter filter) {
		return inRepos.findAll(new Specification<Invoice>() {
			@Override
			public Predicate toPredicate(Root<Invoice> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				List<Predicate>predicates = new ArrayList<Predicate>();
				if(filter.getId()!=0){
					predicates.add(criteriaBuilder.equal(root.get("id"),filter.getId()));
				}
				if(filter.getCustomer()!=null&&!filter.getCustomer().isEmpty()){
					predicates.add(criteriaBuilder.like(root.get("customer"),"%"+filter.getCustomer()+"%"));
				}
				if(filter.getStartDate()!=null&&filter.getEndDate()!=null){
					predicates.add(criteriaBuilder.between(root.get("date"),filter.getStartDate(),filter.getEndDate()));
				}
				if(filter.getCustomerContact()!=0){
					predicates.add(criteriaBuilder.equal(root.get("customerContact"),filter.getCustomerContact()));
				}
				return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
			}
		});
	}

	@Override
	public List<Invoice> getByStatus(String status) {
		// TODO Auto-generated method stub
		return inRepos.getByStatus(status);
	}

	@Override
	public List<Invoice> getByCustomer(String customer, int contact) {
		// TODO Auto-generated method stub
		return inRepos.getByCustomer(customer, contact);
	}

	@Override
	public List<Object> getDetailsByInvoiceId(int invoiceId) {
		// TODO Auto-generated method stub
		return deRepos.getDetailsByInvoiceId(invoiceId);
	}

	@Override
	public List<InvoiceDetail> getDetailsByProductId(int productId) {
		// TODO Auto-generated method stub
		return deRepos.getDetailsByProductId(productId);
	}

}
