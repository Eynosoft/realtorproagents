<?php
/**
 * BrainTree Model 
 * 
 * Manage all the api relation database operations for BrainTree payment gateway
 */
namespace Modules\Payment\Models;

use CodeIgniter\Model;



class BrainTreeModel extends Model
{
    protected $DBGroup              = 'default';
    protected $table                = '';
    protected $primaryKey           = '';
    protected $useAutoIncrement     = true;
    protected $insertID             = 0;
    protected $returnType           = 'array';
    protected $useSoftDeletes       = false;
    protected $protectFields        = true;
    protected $allowedFields        = [];

    // Dates
    protected $useTimestamps        = false;
    protected $dateFormat           = 'datetime';
    protected $createdField         = 'created_at';
    protected $updatedField         = 'updated_at';
    protected $deletedField         = 'deleted_at';

    // Validation
    protected $validationRules      = [];
    protected $validationMessages   = [];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks       = true;
    protected $beforeInsert         = [];
    protected $afterInsert          = [];
    protected $beforeUpdate         = [];
    protected $afterUpdate          = [];
    protected $beforeFind           = [];
    protected $afterFind            = [];
    protected $beforeDelete         = [];
    protected $afterDelete          = [];

    /**
	* Constructor initializes the method and instances
	*/
	function __construct()
	{
		parent::__construct();
    }
}
